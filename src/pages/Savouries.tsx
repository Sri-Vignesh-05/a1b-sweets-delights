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
import samosa1 from "@/assets/samosa-1.jpg";
import samosa2 from "@/assets/samosa-2.jpg";
import namkeen1 from "@/assets/namkeen-1.jpg";
import namkeen2 from "@/assets/namkeen-2.jpg";
import hero2 from "@/assets/hero-2.jpg";

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

const savouriesProducts: Product[] = [
  // Samosas & Kachoris
  {
    id: 1,
    name: "Classic Samosa",
    category: "Samosas & Kachoris",
    image1: samosa1,
    image2: samosa2,
    price: "₹200/kg",
    rating: 4.8,
    description: "Crispy triangular pastry with spiced potato filling",
  },
  {
    id: 2,
    name: "Punjabi Samosa",
    category: "Samosas & Kachoris",
    image1: samosa2,
    image2: samosa1,
    price: "₹220/kg",
    rating: 4.7,
    description: "Large crispy samosa with authentic Punjabi spices",
  },
  {
    id: 3,
    name: "Moong Dal Kachori",
    category: "Samosas & Kachoris",
    image1: hero2,
    image2: samosa1,
    price: "₹240/kg",
    rating: 4.9,
    description: "Flaky pastry filled with spiced moong dal",
  },
  {
    id: 4,
    name: "Pyaaz Kachori",
    category: "Samosas & Kachoris",
    image1: samosa1,
    image2: hero2,
    price: "₹230/kg",
    rating: 4.6,
    description: "Crispy kachori with tangy onion filling",
  },

  // Namkeens
  {
    id: 5,
    name: "Bhujia Sev",
    category: "Namkeens",
    image1: namkeen2,
    image2: namkeen1,
    price: "₹260/kg",
    rating: 4.8,
    description: "Thin crispy noodles made from gram flour",
  },
  {
    id: 6,
    name: "Aloo Bhujia",
    category: "Namkeens",
    image1: namkeen1,
    image2: namkeen2,
    price: "₹240/kg",
    rating: 4.7,
    description: "Crunchy potato-based thin sev",
  },
  {
    id: 7,
    name: "Bikaneri Bhujia",
    category: "Namkeens",
    image1: namkeen2,
    image2: hero2,
    price: "₹280/kg",
    rating: 4.9,
    description: "Famous Rajasthani spicy bhujia",
  },
  {
    id: 8,
    name: "Masala Peanuts",
    category: "Namkeens",
    image1: namkeen1,
    image2: namkeen2,
    price: "₹200/kg",
    rating: 4.6,
    description: "Roasted peanuts with spicy coating",
  },

  // Chaklis & Murukku
  {
    id: 9,
    name: "Rice Chakli",
    category: "Chaklis & Murukku",
    image1: hero2,
    image2: namkeen1,
    price: "₹250/kg",
    rating: 4.7,
    description: "Spiral-shaped crispy rice flour snack",
  },
  {
    id: 10,
    name: "Butter Chakli",
    category: "Chaklis & Murukku",
    image1: namkeen2,
    image2: samosa1,
    price: "₹270/kg",
    rating: 4.8,
    description: "Rich buttery spiral chakli",
  },
  {
    id: 11,
    name: "Thenkuzhal Murukku",
    category: "Chaklis & Murukku",
    image1: namkeen1,
    image2: hero2,
    price: "₹260/kg",
    rating: 4.6,
    description: "Traditional South Indian crunchy murukku",
  },
  {
    id: 12,
    name: "Ring Murukku",
    category: "Chaklis & Murukku",
    image1: namkeen2,
    image2: namkeen1,
    price: "₹240/kg",
    rating: 4.7,
    description: "Ring-shaped crispy murukku",
  },

  // Mixture
  {
    id: 13,
    name: "Bombay Mix",
    category: "Mixture",
    image1: namkeen1,
    image2: namkeen2,
    price: "₹280/kg",
    rating: 4.8,
    description: "Classic Mumbai style mixed namkeen",
  },
  {
    id: 14,
    name: "Cornflakes Mixture",
    category: "Mixture",
    image1: hero2,
    image2: namkeen1,
    price: "₹300/kg",
    rating: 4.9,
    description: "Crunchy cornflakes with peanuts and spices",
  },
  {
    id: 15,
    name: "Madras Mixture",
    category: "Mixture",
    image1: namkeen2,
    image2: namkeen1,
    price: "₹270/kg",
    rating: 4.7,
    description: "South Indian spicy mixture",
  },
  {
    id: 16,
    name: "Diet Mixture",
    category: "Mixture",
    image1: namkeen1,
    image2: hero2,
    price: "₹290/kg",
    rating: 4.6,
    description: "Light and crispy health mixture",
  },

  // Gathiya
  {
    id: 17,
    name: "Nylon Gathiya",
    category: "Gathiya",
    image1: namkeen2,
    image2: namkeen1,
    price: "₹250/kg",
    rating: 4.8,
    description: "Thin and crispy Gujarati gathiya",
  },
  {
    id: 18,
    name: "Papdi Gathiya",
    category: "Gathiya",
    image1: namkeen1,
    image2: namkeen2,
    price: "₹240/kg",
    rating: 4.7,
    description: "Ribbon-shaped crispy gathiya",
  },
  {
    id: 19,
    name: "Ratlami Sev",
    category: "Gathiya",
    image1: hero2,
    image2: namkeen1,
    price: "₹280/kg",
    rating: 4.9,
    description: "Spicy sev from Ratlam with unique flavor",
  },
  {
    id: 20,
    name: "Palak Sev",
    category: "Gathiya",
    image1: namkeen2,
    image2: namkeen1,
    price: "₹300/kg",
    rating: 4.7,
    description: "Spinach-flavored healthy sev",
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

const Savouries = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Samosas & Kachoris",
    "Namkeens",
    "Chaklis & Murukku",
    "Mixture",
    "Gathiya",
  ];

  const filteredProducts = savouriesProducts.filter(
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
              <span className="gradient-text">Our Savouries Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Crispy, crunchy, and irresistibly delicious traditional snacks
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
                <span className="gradient-text">Why Choose Our Savouries?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl mb-3">🌾</div>
                  <h3 className="font-semibold mb-2">Premium Ingredients</h3>
                  <p className="text-sm text-muted-foreground">
                    Made with finest quality flour, spices, and oils
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🔥</div>
                  <h3 className="font-semibold mb-2">Traditional Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    Time-tested recipes following authentic cooking techniques
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🥘</div>
                  <h3 className="font-semibold mb-2">Perfect Crunch</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfectly fried to achieve the ideal crispy texture
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

export default Savouries;
