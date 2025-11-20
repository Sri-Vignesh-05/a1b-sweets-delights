# Frontend to Backend Migration Guide

## Summary of Changes

This document outlines all the changes made to migrate your Sweets & Delights e-commerce platform from Supabase to a MongoDB backend.

## What Was Changed

### Frontend Changes

#### 1. **New API Service Layer** (`src/services/api.ts`)
   - Created centralized API service for all backend calls
   - Handles authentication (login/signup)
   - Manages products, cart, and orders API calls
   - Stores auth tokens in localStorage
   - TypeScript types for all data structures

#### 2. **Updated Authentication Hook** (`src/hooks/useAuth.tsx`)
   - Replaced Supabase auth with backend token-based auth
   - Checks for stored tokens and user ID from localStorage
   - Provides `isAuthenticated()` method for protection

#### 3. **Updated Auth Page** (`src/pages/Auth.tsx`)
   - Now uses `authService.login()` and `authService.signup()`
   - Stores auth token and user ID in localStorage
   - Removed all Supabase dependencies

#### 4. **Updated Cart Page** (`src/pages/Cart.tsx`)
   - Uses `cartService` and `ordersService` from API layer
   - Fetches cart from backend instead of Supabase
   - Creates orders via backend API
   - Properly handles user authentication with tokens

#### 5. **Updated Sweets Page** (`src/pages/Sweets.tsx`)
   - Uses `cartService.addToCart()` for cart operations
   - Removed Supabase product creation logic
   - Simplified to work with existing backend products

#### 6. **Updated Savouries Page** (`src/pages/Savouries.tsx`)
   - Same updates as Sweets page
   - Uses backend API for cart operations

#### 7. **Environment Configuration** (`.env`)
   - Removed Supabase credentials
   - Added `VITE_API_URL=http://localhost:5000/api`
   - Frontend now points to local MongoDB backend

#### 8. **Dependencies** (`package.json`)
   - Removed `@supabase/supabase-js` dependency

### Backend Changes

#### 1. **New User Model** (`backend/models/User.js`)
   - Created User schema with email and password
   - Includes password hashing with bcryptjs
   - Methods for password comparison
   - Excludes password from JSON output

#### 2. **New Auth Controller** (`backend/controllers/authController.js`)
   - `signup()` - Create new user account
   - `login()` - Authenticate user and return JWT token
   - `getUser()` - Fetch current user info
   - JWT token generation with 7-day expiration

#### 3. **New Auth Routes** (`backend/routes/auth.js`)
   - `POST /api/auth/signup` - User registration
   - `POST /api/auth/login` - User login
   - `GET /api/auth/me` - Get current user (protected)

#### 4. **New Auth Middleware** (`backend/middleware/authMiddleware.js`)
   - Verifies JWT token from Authorization header
   - Extracts userId and adds to request object
   - Protects routes that require authentication

#### 5. **Updated Server Configuration** (`backend/server.js`)
   - Added auth routes to Express app
   - Auth routes available at `/api/auth`

#### 6. **Updated Route Protection**
   - Cart routes: All endpoints now require authentication
   - Orders routes: All endpoints now require authentication
   - Products routes: Read endpoints public, write endpoints need auth
   - Auth middleware validates JWT tokens

#### 7. **Backend Dependencies** (`backend/package.json`)
   - Added `bcryptjs` - For password hashing
   - Added `jsonwebtoken` - For JWT token generation

#### 8. **Backend Environment** (`backend/.env`)
   - Added `JWT_SECRET` for token signing

## How It Works

### User Registration Flow
1. User fills signup form on Auth page
2. Frontend sends POST request to `/api/auth/signup`
3. Backend creates new User in MongoDB
4. Backend returns JWT token and user ID
5. Frontend stores token and userId in localStorage
6. Frontend redirects to home page

### User Login Flow
1. User enters credentials on Auth page
2. Frontend sends POST request to `/api/auth/login`
3. Backend verifies password using bcryptjs
4. Backend returns JWT token and user ID
5. Frontend stores credentials in localStorage
6. User can now access protected pages (cart, checkout)

### Shopping Flow
1. User browses products (no auth needed)
2. User clicks "Add to Cart"
   - Frontend checks if user is authenticated
   - If not, redirects to Auth page
   - If yes, calls `/api/cart` with product ID
3. Backend adds item to cart in MongoDB
4. User proceeds to checkout
5. User fills delivery details and places order
6. Order created in MongoDB with order items

### Token-Based Authentication
- JWT tokens stored in localStorage as `authToken`
- User ID stored in localStorage as `userId`
- All protected API calls include `Authorization: Bearer <token>`
- Backend middleware validates token on each request
- Invalid/expired tokens return 401 Unauthorized

## Installation & Running

### Frontend Setup
```bash
cd a1b-sweets-delights
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId/items` - Get order items

## Key Differences from Supabase

| Feature | Supabase | MongoDB Backend |
|---------|----------|-----------------|
| Authentication | OAuth, Magic Links | JWT Tokens |
| Database | PostgreSQL | MongoDB |
| Auth Storage | Browser Session | localStorage |
| Password Hashing | Supabase handles | bcryptjs |
| Token Expiry | Auto refresh | 7 days |
| User Creation | Supabase auth | Custom signup |

## Testing the Integration

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Protected Route (Cart)
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Notes

1. **Supabase Files**: The `/src/integrations/supabase/` folder is no longer used but left in place. You can delete it if desired.

2. **Password Security**: The JWT_SECRET in backend/.env should be changed in production to a strong, random value.

3. **CORS**: Backend is configured with CORS to accept requests from frontend on different ports during development.

4. **Error Handling**: All API calls in the service layer throw errors that are caught and displayed as toast notifications.

5. **User Context**: Currently using localStorage for token storage. For better state management, consider adding React Context or Redux.

## Troubleshooting

### "User not found" or "Invalid credentials" on Login
- Verify user was created with that email
- Check password is correct
- Ensure backend is running on port 5000

### "Authorization token required" Error
- Verify user is logged in
- Check token is stored in localStorage
- Token might be expired (7 day limit)

### CORS Errors
- Ensure backend server is running
- Check VITE_API_URL in .env points to correct backend
- Verify backend has CORS enabled

### Cart not updating
- Verify auth token is valid
- Check user ID matches in localStorage
- Ensure backend received the request

## Next Steps

1. ✅ Migration complete - all Supabase references removed
2. ✅ Backend auth system implemented
3. ✅ Frontend connected to MongoDB backend
4. Consider adding:
   - Email verification on signup
   - Password reset functionality
   - User profile management
   - Order status tracking
   - Admin panel for product management
