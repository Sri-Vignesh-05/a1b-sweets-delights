import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import ladoo1 from "@/assets/ladoo-1.jpg";
import ladoo2 from "@/assets/ladoo-2.jpg";
import barfi1 from "@/assets/barfi-1.jpg";
import barfi2 from "@/assets/barfi-2.jpg";
import hero1 from "@/assets/hero-1.jpg";

interface Product {
  id: number;
  name: string;
  category: string;
  image1: string;
  image2: string;
  price: string;
  rating: number;
  description: string;
}

const sweetsProducts: Product[] = [
  // Traditional Sweets
  {
    id: 1,
    name: "Besan Ladoo",
    category: "Traditional Sweets",
    image1: ladoo1,
    image2: ladoo2,
    price: "₹350/kg",
    rating: 4.8,
    description: "Classic ladoo made with roasted gram flour and desi ghee",
  },
  {
    id: 2,
    name: "Motichoor Ladoo",
    category: "Traditional Sweets",
    image1: ladoo2,
    image2: ladoo1,
    price: "₹380/kg",
    rating: 4.7,
    description: "Tiny boondi pearls in sweet sugar syrup",
  },
  {
    id: 3,
    name: "Gulab Jamun",
    category: "Traditional Sweets",
    image1: hero1,
    image2: ladoo1,
    price: "₹400/kg",
    rating: 4.9,
    description: "Soft milk solids dumplings in rose-flavored syrup",
  },
  {
    id: 4,
    name: "Jalebi",
    category: "Traditional Sweets",
    image1: ladoo2,
    image2: hero1,
    price: "₹320/kg",
    rating: 4.6,
    description: "Crispy spiral-shaped sweet soaked in sugar syrup",
  },
  
  // Dry Fruits Sweets
  {
    id: 5,
    name: "Kaju Katli",
    category: "Dry Fruits Sweets",
    image1: barfi2,
    image2: barfi1,
    price: "₹650/kg",
    rating: 5.0,
    description: "Premium cashew fudge with edible silver leaf",
  },
  {
    id: 6,
    name: "Pista Barfi",
    category: "Dry Fruits Sweets",
    image1: barfi1,
    image2: barfi2,
    price: "₹600/kg",
    rating: 4.8,
    description: "Rich pistachio fudge with authentic flavor",
  },
  {
    id: 7,
    name: "Badam Halwa",
    category: "Dry Fruits Sweets",
    image1: ladoo1,
    image2: barfi1,
    price: "₹550/kg",
    rating: 4.7,
    description: "Creamy almond pudding with pure ghee",
  },
  {
    id: 8,
    name: "Dry Fruit Ladoo",
    category: "Dry Fruits Sweets",
    image1: ladoo2,
    image2: ladoo1,
    price: "₹580/kg",
    rating: 4.9,
    description: "Mixed dry fruits and dates energy balls",
  },

  // Milk-based Sweets
  {
    id: 9,
    name: "Milk Cake",
    category: "Milk-based Sweets",
    image1: barfi1,
    image2: barfi2,
    price: "₹420/kg",
    rating: 4.6,
    description: "Traditional milk cake with caramelized texture",
  },
  {
    id: 10,
    name: "Rabri",
    category: "Milk-based Sweets",
    image1: hero1,
    image2: ladoo2,
    price: "₹380/kg",
    rating: 4.7,
    description: "Thickened sweetened milk with dried fruits",
  },
  {
    id: 11,
    name: "Kalakand",
    category: "Milk-based Sweets",
    image1: barfi2,
    image2: barfi1,
    price: "₹400/kg",
    rating: 4.8,
    description: "Soft milk cake with granular texture",
  },
  {
    id: 12,
    name: "Peda",
    category: "Milk-based Sweets",
    image1: ladoo1,
    image2: ladoo2,
    price: "₹360/kg",
    rating: 4.5,
    description: "Traditional milk sweet flavored with cardamom",
  },

  // Bengali Sweets
  {
    id: 13,
    name: "Rasgulla",
    category: "Bengali Sweets",
    image1: hero1,
    image2: ladoo1,
    price: "₹340/kg",
    rating: 4.8,
    description: "Spongy cottage cheese balls in sugar syrup",
  },
  {
    id: 14,
    name: "Sandesh",
    category: "Bengali Sweets",
    image1: barfi1,
    image2: barfi2,
    price: "₹380/kg",
    rating: 4.7,
    description: "Delicate cottage cheese sweet with subtle sweetness",
  },
  {
    id: 15,
    name: "Rasmalai",
    category: "Bengali Sweets",
    image1: ladoo2,
    image2: hero1,
    price: "₹420/kg",
    rating: 4.9,
    description: "Cottage cheese discs in thickened milk",
  },
  {
    id: 16,
    name: "Chomchom",
    category: "Bengali Sweets",
    image1: barfi2,
    image2: barfi1,
    price: "₹360/kg",
    rating: 4.6,
    description: "Oval-shaped sweet with coconut coating",
  },

  // Festival Special
  {
    id: 17,
    name: "Gujiya",
    category: "Festival Special",
    image1: hero1,
    image2: ladoo1,
    price: "₹400/kg",
    rating: 4.8,
    description: "Crescent-shaped pastry filled with khoya and dry fruits",
  },
  {
    id: 18,
    name: "Puran Poli",
    category: "Festival Special",
    image1: ladoo2,
    image2: barfi1,
    price: "₹350/kg",
    rating: 4.7,
    description: "Sweet flatbread with lentil and jaggery filling",
  },
  {
    id: 19,
    name: "Modak",
    category: "Festival Special",
    image1: barfi1,
    image2: ladoo2,
    price: "₹380/kg",
    rating: 4.9,
    description: "Steamed dumplings with coconut and jaggery",
  },
  {
    id: 20,
    name: "Shankarpali",
    category: "Festival Special",
    image1: barfi2,
    image2: hero1,
    price: "₹280/kg",
    rating: 4.5,
    description: "Crispy diamond-shaped sweet snack",
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login required",
          description: "Please login to add items to cart",
        });
        navigate("/auth");
        return;
      }

      // Get or create product in products table
      const priceNumber = parseFloat(product.price.replace(/[₹,\/kg]/g, ""));
      const { data: existingProduct, error: fetchError } = await supabase
        .from("products")
        .select("id")
        .eq("name", product.name)
        .maybeSingle();

      let productId = existingProduct?.id;

      if (!existingProduct) {
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert({
            name: product.name,
            category: product.category,
            price: priceNumber,
            image_url: product.image1,
            description: product.description,
            rating: product.rating,
          })
          .select("id")
          .single();

        if (insertError) throw insertError;
        productId = newProduct.id;
      }

      // Check if item already in cart
      const { data: existingCart, error: cartFetchError } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", session.user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existingCart) {
        // Update quantity
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity: existingCart.quantity + 1 })
          .eq("id", existingCart.id);

        if (updateError) throw updateError;
      } else {
        // Add new item
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert({
            user_id: session.user.id,
            product_id: productId,
            quantity: 1,
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
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
    <Card
      className="overflow-hidden hover-lift cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={isHovered ? product.image2 : product.image1}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-primary">
          <Star className="h-3 w-3 mr-1 fill-current" />
          {product.rating}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <Badge variant="secondary" className="mb-2 text-xs">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">{product.price}</span>
          <Button size="sm" onClick={handleAddToCart} disabled={adding}>
            {adding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Sweets = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Traditional Sweets",
    "Dry Fruits Sweets",
    "Milk-based Sweets",
    "Bengali Sweets",
    "Festival Special",
  ];

  const filteredProducts = sweetsProducts.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen">
      <TopNav />
      <MainNav />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Our Sweets Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Handcrafted with love, tradition, and the finest ingredients
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="mb-6">
            <p className="text-center text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span className="gradient-text">Why Choose Our Sweets?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl mb-3">🥛</div>
                  <h3 className="font-semibold mb-2">Pure Ingredients</h3>
                  <p className="text-sm text-muted-foreground">
                    Made with pure milk, desi ghee, and premium quality ingredients
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">👨‍🍳</div>
                  <h3 className="font-semibold mb-2">Expert Halwais</h3>
                  <p className="text-sm text-muted-foreground">
                    Crafted by master sweet makers with decades of experience
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-semibold mb-2">Fresh Daily</h3>
                  <p className="text-sm text-muted-foreground">
                    All sweets are made fresh daily in our kitchens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sweets;
