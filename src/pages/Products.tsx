import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus } from "lucide-react";
import { cartService, authService, productsService, Product as ApiProduct } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const ProductCard = ({ product, onAddToCart }: { product: ApiProduct; onAddToCart: (product: ApiProduct, quantity: number) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      if (!authService.isAuthenticated()) {
        toast({
          title: "Login required",
          description: "Please login to add items to cart",
        });
        return;
      }

      await onAddToCart(product, quantity);
      setQuantity(1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-primary">
          <Star className="h-3 w-3 mr-1 fill-current" />
          {product.rating || "4.5"}
        </Badge>
      </div>
      <div className="p-4">
        <Badge variant="secondary" className="mb-2 text-xs">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold text-lg">₹{product.price}</span>
            <div className="flex items-center gap-2 bg-muted rounded-lg">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            className="w-full" 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={adding}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface PageProps {
  category: string;
  title: string;
  description: string;
}

const ProductsPage = ({ category, title, description }: PageProps) => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const allProducts = await productsService.getAll();
      const filtered = allProducts.filter(p => p.category.includes(category));
      setProducts(filtered);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: ApiProduct, quantity: number) => {
    if (!authService.isAuthenticated()) {
      toast({
        title: "Login required",
        description: "Please login to add items to cart",
      });
      navigate("/auth");
      return;
    }

    try {
      await cartService.addToCart(product._id, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} (x${quantity}) added to cart`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const categories = [...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <MainNav />
      
      <main className="pt-32">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => setSelectedCategory("All")}
                size="sm"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          <div className="mb-6">
            <p className="text-center text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button onClick={() => navigate("/")}>Go Home</Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
