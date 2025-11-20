import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartService, ordersService, authService, Product } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemDisplay {
  _id: string;
  quantity: number;
  product_id: string;
  product: Product;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    alternate_phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchCart();
  }, []);

  const checkAuthAndFetchCart = async () => {
    if (!authService.isAuthenticated()) {
      toast({ title: "Please login", description: "You need to login to view your cart." });
      navigate("/auth");
      return;
    }
    fetchCartItems();
  };

  const fetchCartItems = async () => {
    try {
      const items = await cartService.getCart();
      // Transform items - product_id is populated from backend
      const displayItems = items.map((item: any) => ({
        _id: item._id,
        quantity: item.quantity,
        product_id: item.product_id?._id || item.product_id,
        product: item.product_id || {}, // Backend populates product_id with full product data
      }));
      setCartItems(displayItems);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await cartService.updateQuantity(itemId, newQuantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await cartService.removeItem(itemId);
      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
      toast({ title: "Item removed", description: "Item removed from cart successfully." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const items = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const totalAmount = calculateTotal();

      await ordersService.createOrder(
        items,
        orderForm.name,
        orderForm.phone,
        orderForm.address,
        orderForm.alternate_phone
      );

      toast({
        title: "Order placed!",
        description: "Your order has been placed successfully.",
      });

      setShowOrderDialog(false);
      setCartItems([]);
      setOrderForm({ name: "", phone: "", address: "", alternate_phone: "" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => navigate("/sweets")}>Continue Shopping</Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 border rounded-lg bg-card"
              >
                <img
                  src={item.product?.image_url || "/placeholder.svg"}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product?.name}</h3>
                  <p className="text-muted-foreground text-sm">₹{item.product?.price || 0} per unit</p>
                  <p className="text-primary font-bold mt-1">Subtotal: ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeItem(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => setShowOrderDialog(true)}
            >
              Confirm Order
            </Button>
          </div>
        </>
      )}

      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Please provide your delivery information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={orderForm.name}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={orderForm.phone}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, address: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alternate_phone">Alternate Phone (Optional)</Label>
              <Input
                id="alternate_phone"
                type="tel"
                value={orderForm.alternate_phone}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, alternate_phone: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
