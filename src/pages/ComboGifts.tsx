import { TopNav } from "@/components/TopNav";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Box, Heart, Star } from "lucide-react";
import hero3 from "@/assets/hero-3.jpg";
import hero1 from "@/assets/hero-1.jpg";

const ComboGifts = () => {
  const giftCategories = [
    {
      icon: Gift,
      title: "Festival Special",
      description: "Curated boxes for Diwali, Holi, and other celebrations",
    },
    {
      icon: Box,
      title: "Corporate Gifts",
      description: "Professional packaging for business gifting",
    },
    {
      icon: Heart,
      title: "Wedding Favors",
      description: "Elegant boxes perfect for wedding guests",
    },
    {
      icon: Star,
      title: "Premium Collection",
      description: "Luxury assortments of our finest products",
    },
  ];

  const combos = [
    {
      name: "Family Celebration Pack",
      price: "₹999",
      items: "Mix of 8 varieties (1.5kg total)",
      image: hero1,
      popular: true,
    },
    {
      name: "Diwali Special Box",
      price: "₹1,499",
      items: "12 varieties with decorative diya (2kg)",
      image: hero3,
      popular: true,
    },
    {
      name: "Corporate Gift Set",
      price: "₹2,499",
      items: "Premium assortment with branded packaging (3kg)",
      image: hero1,
      popular: false,
    },
    {
      name: "Sweet & Savory Combo",
      price: "₹799",
      items: "6 varieties - 3 sweets + 3 savouries (1kg)",
      image: hero3,
      popular: false,
    },
    {
      name: "Wedding Favor Box",
      price: "₹399",
      items: "Small elegant box with 4 varieties (500g)",
      image: hero1,
      popular: false,
    },
    {
      name: "Grand Celebration",
      price: "₹3,999",
      items: "Luxury collection of 20 varieties (5kg)",
      image: hero3,
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <TopNav />
      <MainNav />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Combo & Gift Boxes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Thoughtfully curated selections perfect for every celebration and occasion
            </p>
          </div>
        </section>

        {/* Gift Categories */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="gradient-text">Perfect For Every Occasion</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCategories.map((category) => (
              <Card key={category.title} className="p-6 text-center hover-lift cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Combo Packages */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="gradient-text">Our Popular Combos</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {combos.map((combo) => (
                <Card key={combo.name} className="overflow-hidden hover-lift group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {combo.popular && (
                      <Badge className="absolute top-3 right-3 bg-accent">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{combo.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{combo.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{combo.price}</span>
                      <Button>Order Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Gift Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="p-8 md:p-12 text-center max-w-4xl mx-auto">
            <Gift className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Create Your Custom Gift Box</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Want something special? We can create personalized gift boxes with your choice of 
              products, custom packaging, and personalized messages. Perfect for corporate events, 
              weddings, and special occasions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">Contact Us for Custom Orders</Button>
              <Button size="lg" variant="outline">View Packaging Options</Button>
            </div>
          </Card>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🎁</div>
                <h3 className="font-semibold mb-1">Premium Packaging</h3>
                <p className="text-sm text-muted-foreground">Beautiful gift-ready boxes</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold mb-1">Personalization</h3>
                <p className="text-sm text-muted-foreground">Add custom messages</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold mb-1">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">On orders above ₹1500</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💯</div>
                <h3 className="font-semibold mb-1">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">Fresh & authentic taste</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComboGifts;
