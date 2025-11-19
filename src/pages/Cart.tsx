import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Please login", description: "You need to login to view your cart." });
      navigate("/auth");
      return;
    }
    fetchCartItems();
  };

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemId);

      if (error) throw error;

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

      if (error) throw error;

      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      toast({ title: "Item removed", description: "Item removed from cart successfully." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const totalAmount = calculateTotal();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: session.user.id,
          name: orderForm.name,
          phone: orderForm.phone,
          address: orderForm.address,
          alternate_phone: orderForm.alternate_phone,
          total_amount: totalAmount,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      const { error: clearError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id);

      if (clearError) throw clearError;

      toast({
        title: "Order placed!",
        description: "Your order has been placed successfully.",
      });

      setShowOrderDialog(false);
      setCartItems([]);
      setOrderForm({ name: "", phone: "", address: "", alternate_phone: "" });
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
                key={item.id}
                className="flex gap-4 p-4 border rounded-lg bg-card"
              >
                <img
                  src={item.products.image_url || "/placeholder.svg"}
                  alt={item.products.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.products.name}</h3>
                  <p className="text-primary font-bold">₹{item.products.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
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
