import { useState } from "react";
import { Card } from "@/components/ui/card";
import ladoo1 from "@/assets/ladoo-1.jpg";
import ladoo2 from "@/assets/ladoo-2.jpg";
import barfi1 from "@/assets/barfi-1.jpg";
import barfi2 from "@/assets/barfi-2.jpg";
import samosa1 from "@/assets/samosa-1.jpg";
import samosa2 from "@/assets/samosa-2.jpg";
import namkeen1 from "@/assets/namkeen-1.jpg";
import namkeen2 from "@/assets/namkeen-2.jpg";

interface Product {
  name: string;
  image1: string;
  image2: string;
  price: string;
}

const sweets: Product[] = [
  {
    name: "Besan Ladoo",
    image1: ladoo1,
    image2: ladoo2,
    price: "₹350/kg",
  },
  {
    name: "Assorted Barfi",
    image1: barfi1,
    image2: barfi2,
    price: "₹450/kg",
  },
];

const savouries: Product[] = [
  {
    name: "Crispy Samosas",
    image1: samosa1,
    image2: samosa2,
    price: "₹200/kg",
  },
  {
    name: "Special Namkeen",
    image1: namkeen1,
    image2: namkeen2,
    price: "₹280/kg",
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
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-primary font-bold">{product.price}</p>
      </div>
    </Card>
  );
};

export const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Special Sweets */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">
              <span className="gradient-text">Special Sweets</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Handcrafted with love, tradition & finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sweets.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>

        {/* Best Seller Savouries */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">
              <span className="gradient-text">Best Seller Savouries</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Crispy, crunchy & irresistibly delicious
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {savouries.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
