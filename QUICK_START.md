# Quick Start Guide

## Prerequisites
- Node.js and npm installed
- MongoDB connection (you already have this configured)

## Running the Application

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ..
npm install
```

### Step 2: Start Backend Server

From the `backend` directory:
```bash
npm run dev
```

You should see: `Server running on port 5000`

### Step 3: Start Frontend Development Server

From the root directory (a1b-sweets-delights):
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Testing the Application

### 1. Create a New Account
- Navigate to http://localhost:5173/auth
- Click "Don't have an account? Sign Up"
- Enter email and password
- Click "Sign Up"
- You'll be logged in automatically

### 2. Browse Products
- Go to home page
- Click on product categories (Sweets, Savouries, etc.)
- Products are fetched from your MongoDB backend

### 3. Add to Cart
- Browse any product category
- Click "Add to Cart" button
- You'll be prompted to login if not authenticated
- Item will be added to cart

### 4. View Cart
- Click on "Cart" link
- See all items you've added
- Adjust quantities or remove items
- Click "Confirm Order" to place an order

### 5. Place Order
- Fill in your delivery details
- Click "Place Order"
- Order is created in MongoDB
- Cart is automatically cleared

## Verification Checklist

✅ Backend running on http://localhost:5000  
✅ Frontend running on http://localhost:5173  
✅ Can create new account  
✅ Can login with existing account  
✅ Can view products from MongoDB  
✅ Can add items to cart  
✅ Can place orders  

## Common Issues

**Issue: "API is not reachable"**
- Verify backend is running on port 5000
- Check VITE_API_URL in `.env` file
- Restart backend server

**Issue: "User not found" on login**
- Verify you created the account first
- Try creating a new account instead
- Check backend is connected to MongoDB

**Issue: Products not showing**
- Verify you have products in MongoDB
- Check backend console for errors
- Ensure /api/products endpoint is working

## What Changed from Supabase

1. **Authentication**: Now using JWT tokens instead of Supabase auth
2. **Database**: Using MongoDB instead of PostgreSQL
3. **Storage**: Auth tokens stored in browser localStorage
4. **Backend**: Custom Express.js backend instead of Supabase
5. **Password**: Hashed with bcryptjs instead of Supabase default

## File Structure

```
a1b-sweets-delights/
├── src/
│   ├── services/
│   │   └── api.ts (NEW - API service layer)
│   ├── hooks/
│   │   └── useAuth.tsx (UPDATED - now uses JWT)
│   ├── pages/
│   │   ├── Auth.tsx (UPDATED - backend auth)
│   │   ├── Cart.tsx (UPDATED - backend API)
│   │   ├── Sweets.tsx (UPDATED - backend API)
│   │   └── Savouries.tsx (UPDATED - backend API)
│   └── ...
├── .env (UPDATED - removed Supabase, added API_URL)
└── package.json (UPDATED - removed @supabase/supabase-js)

backend/
├── models/
│   └── User.js (NEW - User schema)
├── controllers/
│   ├── authController.js (NEW - Auth logic)
│   └── ...
├── routes/
│   ├── auth.js (NEW - Auth endpoints)
│   └── ...
├── middleware/
│   └── authMiddleware.js (NEW - JWT validation)
├── server.js (UPDATED - added auth routes)
└── package.json (UPDATED - added bcryptjs, jsonwebtoken)
```

## API Endpoints Available

**Auth**
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me

**Products**
- GET /api/products
- GET /api/products/:id

**Cart** (requires auth)
- GET /api/cart
- POST /api/cart
- PUT /api/cart/:id
- DELETE /api/cart/:id

**Orders** (requires auth)
- POST /api/orders
- GET /api/orders
- GET /api/orders/:orderId/items

## Next: Production Deployment

When ready to deploy:
1. Change JWT_SECRET in backend/.env to a secure random value
2. Update VITE_API_URL to production backend URL
3. Build frontend: `npm run build`
4. Deploy backend to production server
5. Set up database backups
6. Enable HTTPS for all connections
7. Consider adding rate limiting for auth endpoints

## Need Help?

Check the MIGRATION_GUIDE.md for detailed information about:
- How authentication works
- API request examples
- Troubleshooting guide
- Testing procedures
