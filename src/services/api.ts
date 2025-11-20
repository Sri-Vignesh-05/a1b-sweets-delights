// API Service for MongoDB Backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
  rating?: number;
}

export interface CartItem {
  _id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  products?: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id: string;
  user_id: string;
  name: string;
  phone: string;
  address: string;
  alternate_phone?: string;
  total_amount: number;
  status?: string;
  createdAt?: string;
}

// Auth Service
export const authService = {
  async signup(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.user.id);
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userId', data.user.id);
    return data;
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  getUserId(): string | null {
    return localStorage.getItem('userId');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

// Products Service
export const productsService = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  async create(product: Omit<Product, '_id'>): Promise<Product> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to delete product');
  },
};

// Cart Service
export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const userId = authService.getUserId();
    const token = authService.getToken();
    
    if (!userId) throw new Error('User not authenticated');
    
    const response = await fetch(`${API_URL}/cart?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem> {
    const userId = authService.getUserId();
    const token = authService.getToken();

    if (!userId || !token) throw new Error('User not authenticated');
    
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
    });
    
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  async updateQuantity(itemId: string, quantity: number): Promise<CartItem> {
    const userId = authService.getUserId();
    const token = authService.getToken();

    if (!userId || !token) throw new Error('User not authenticated');
    
    const response = await fetch(`${API_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId, quantity }),
    });
    
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  async removeItem(itemId: string): Promise<void> {
    const userId = authService.getUserId();
    const token = authService.getToken();
    
    if (!userId) throw new Error('User not authenticated');
    
    const response = await fetch(`${API_URL}/cart/${itemId}?user_id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to remove from cart');
  },
};

// Orders Service
export const ordersService = {
  async createOrder(
    items: Array<{ product_id: string; quantity: number }>,
    name: string,
    phone: string,
    address: string,
    alternate_phone?: string
  ): Promise<Order> {
    const userId = authService.getUserId();
    const token = authService.getToken();
    
    if (!userId) throw new Error('User not authenticated');
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        items,
        name,
        phone,
        address,
        alternate_phone,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async getOrders(): Promise<Order[]> {
    const userId = authService.getUserId();
    const token = authService.getToken();
    
    if (!userId) throw new Error('User not authenticated');
    
    const response = await fetch(`${API_URL}/orders?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getOrderItems(orderId: string) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/orders/${orderId}/items`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch order items');
    return response.json();
  },
};

// Admin Service
export const adminService = {
  async getDashboardStats() {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Products
  async getAllProducts(): Promise<Product[]> {
    const token = authService.getToken();
    if (!token) throw new Error('User not authenticated');
    const response = await fetch(`${API_URL}/admin/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async createProduct(product: Omit<Product, '_id'>): Promise<Product> {
    const token = authService.getToken();
    if (!token) throw new Error('User not authenticated');
    const response = await fetch(`${API_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }
    return response.json();
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const token = authService.getToken();
    if (!token) throw new Error('User not authenticated');
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('User not authenticated');
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to delete product');
  },

  // Users
  async getAllUsers() {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getUserDetails(userId: string) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch user details');
    return response.json();
  },

  // Orders
  async getAllOrders() {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getOrderDetails(orderId: string) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch order details');
    return response.json();
  },

  async updateOrderStatus(orderId: string, status: string) {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },
};
