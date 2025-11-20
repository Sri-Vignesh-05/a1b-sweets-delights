import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminService, authService, Product } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, BarChart3, Users, Package, ShoppingCart } from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

interface UserWithOrders {
  _id: string;
  email: string;
  name?: string;
  createdAt: string;
  orders: any[];
}

interface OrderDetail {
  _id: string;
  user_id: any;
  name: string;
  phone: string;
  address: string;
  total_amount: number;
  status?: string;
  createdAt: string;
  items: any[];
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserWithOrders[]>([]);
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Product form states
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image_url: "",
    rating: "4.5",
  });

  // Order detail modal
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [orderStatusUpdate, setOrderStatusUpdate] = useState("");

  const categories = [
    "Sweets",
    "Samosas",
    "Namkeens",
    "Chaklis & Murukku",
    "Mixture",
    "Gathiya",
    "Milk-based",
    "Bengali",
    "Festival",
  ];

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/auth");
      return;
    }
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsData, productsData, usersData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAllProducts(),
        adminService.getAllUsers(),
        adminService.getAllOrders(),
      ]);
      setStats(statsData);
      setProducts(productsData);
      setUsers(usersData);
      setOrders(ordersData);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        name: productForm.name,
        category: productForm.category,
        price: parseFloat(productForm.price),
        description: productForm.description,
        image_url: productForm.image_url || "/placeholder.svg",
        rating: parseFloat(productForm.rating),
      };

      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, productData);
        toast({ title: "Success", description: "Product updated successfully" });
      } else {
        await adminService.createProduct(productData);
        toast({ title: "Success", description: "Product created successfully" });
      }

      setShowProductDialog(false);
      setEditingProduct(null);
      setProductForm({
        name: "",
        category: "",
        price: "",
        description: "",
        image_url: "",
        rating: "4.5",
      });
      fetchAdminData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await adminService.deleteProduct(id);
      toast({ title: "Success", description: "Product deleted successfully" });
      fetchAdminData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description || "",
      image_url: product.image_url || "",
      rating: (product.rating || 4.5).toString(),
    });
    setShowProductDialog(true);
  };

  const handleUpdateOrderStatus = async () => {
    if (!selectedOrder || !orderStatusUpdate) return;

    try {
      await adminService.updateOrderStatus(selectedOrder._id, orderStatusUpdate);
      toast({ title: "Success", description: "Order status updated" });
      setSelectedOrder(null);
      setOrderStatusUpdate("");
      fetchAdminData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => { authService.logout(); navigate("/auth"); }}>
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Products</p>
                    <p className="text-3xl font-bold">{stats?.totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Users</p>
                    <p className="text-3xl font-bold">{stats?.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Orders</p>
                    <p className="text-3xl font-bold">{stats?.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">₹{stats?.totalRevenue.toFixed(0)}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </Card>
            </div>

            {/* Recent Orders Preview */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <div className="space-y-2">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex justify-between items-center p-3 bg-muted rounded">
                    <div>
                      <p className="font-semibold">{order.name}</p>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{order.total_amount.toFixed(2)}</p>
                      <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                        {order.status || "pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              <Button onClick={() => {
                setEditingProduct(null);
                setProductForm({ name: "", category: "", price: "", description: "", image_url: "", rating: "4.5" });
                setShowProductDialog(true);
              }}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product._id} className="overflow-hidden">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <p className="font-bold text-primary mb-2">₹{product.price}</p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Users</h2>
            <div className="space-y-3">
              {users.map((user) => (
                <Card key={user._id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{user.email}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {user.name || "No name provided"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-2">
                        Orders: {user.orders?.length || 0}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Orders</h2>
            <div className="space-y-3">
              {orders.map((order) => (
                <Card
                  key={order._id}
                  className="p-4 cursor-pointer hover:bg-muted transition"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{order.name}</h3>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                      <p className="text-sm text-muted-foreground mb-2">{order.address}</p>
                      <p className="font-bold text-primary">₹{order.total_amount.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                        {order.status || "pending"}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              Fill in the product details below
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={productForm.rating}
                  onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                placeholder="https://example.com/image.jpg"
                value={productForm.image_url}
                onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
              />
              {productForm.image_url && (
                <img
                  src={productForm.image_url}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowProductDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-semibold">{selectedOrder.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">{selectedOrder.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold">{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-primary text-lg">₹{selectedOrder.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Order Items</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between p-2 bg-muted rounded text-sm">
                      <span>{item.product_id?.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="status">Update Order Status</Label>
                <div className="flex gap-2">
                  <select
                    id="status"
                    value={orderStatusUpdate}
                    onChange={(e) => setOrderStatusUpdate(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md bg-background"
                  >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button onClick={handleUpdateOrderStatus}>Update</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
