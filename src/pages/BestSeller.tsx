import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ladoo1 from "@/assets/ladoo-1.jpg";
import ladoo2 from "@/assets/ladoo-2.jpg";
import barfi1 from "@/assets/barfi-1.jpg";
import barfi2 from "@/assets/barfi-2.jpg";
import samosa1 from "@/assets/samosa-1.jpg";
import samosa2 from "@/assets/samosa-2.jpg";
import namkeen1 from "@/assets/namkeen-1.jpg";
import namkeen2 from "@/assets/namkeen-2.jpg";

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

const bestSellers: Product[] = [
  {
    id: 1,
    name: "Premium Besan Ladoo",
    category: "Sweet",
    image1: ladoo1,
    image2: ladoo2,
    price: "₹350/kg",
    rating: 4.8,
    description: "Made with pure desi ghee and roasted gram flour",
  },
  {
    id: 2,
    name: "Assorted Barfi Box",
    category: "Sweet",
    image1: barfi1,
    image2: barfi2,
    price: "₹450/kg",
    rating: 4.9,
    description: "Collection of kaju, pista, and coconut barfi",
  },
  {
    id: 3,
    name: "Special Samosa Pack",
    category: "Savoury",
    image1: samosa1,
    image2: samosa2,
    price: "₹200/kg",
    rating: 4.7,
    description: "Crispy samosas with spiced potato filling",
  },
  {
    id: 4,
    name: "Premium Namkeen Mix",
    category: "Savoury",
    image1: namkeen1,
    image2: namkeen2,
    price: "₹280/kg",
    rating: 4.6,
    description: "A perfect blend of crunchy Indian snacks",
  },
  {
    id: 5,
    name: "Motichoor Ladoo",
    category: "Sweet",
    image1: ladoo2,
    image2: ladoo1,
    price: "₹380/kg",
    rating: 4.8,
    description: "Tiny pearl-sized boondi balls in sweet syrup",
  },
  {
    id: 6,
    name: "Kaju Katli",
    category: "Sweet",
    image1: barfi2,
    image2: barfi1,
    price: "₹650/kg",
    rating: 5.0,
    description: "Diamond-shaped cashew fudge with silver leaf",
  },
  {
    id: 7,
    name: "Mini Kachori",
    category: "Savoury",
    image1: samosa2,
    image2: samosa1,
    price: "₹220/kg",
    rating: 4.5,
    description: "Flaky pastries filled with spiced lentils",
  },
  {
    id: 8,
    name: "Bhujia Sev",
    category: "Savoury",
    image1: namkeen2,
    image2: namkeen1,
    price: "₹260/kg",
    rating: 4.7,
    description: "Crispy thin noodles made from gram flour",
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">{product.price}</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
};

const BestSeller = () => {
  const [filter, setFilter] = useState<"All" | "Sweet" | "Savoury">("All");

  const filteredProducts = bestSellers.filter(
    (product) => filter === "All" || product.category === filter
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
              <span className="gradient-text">Best Sellers</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Our most loved products, chosen by thousands of happy customers
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={filter === "All" ? "default" : "outline"}
              onClick={() => setFilter("All")}
            >
              All Products
            </Button>
            <Button
              variant={filter === "Sweet" ? "default" : "outline"}
              onClick={() => setFilter("Sweet")}
            >
              Sweets
            </Button>
            <Button
              variant={filter === "Savoury" ? "default" : "outline"}
              onClick={() => setFilter("Savoury")}
            >
              Savouries
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Why Best Sellers Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span className="gradient-text">Why Our Customers Love These</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <p className="text-muted-foreground">Orders Delivered</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-muted-foreground">Customer Satisfaction</p>
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

export default BestSeller;
