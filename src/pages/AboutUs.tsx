import { TopNav } from "@/components/TopNav";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Award, Heart, Users, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const AboutUs = () => {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We use only the finest ingredients, sourced from trusted suppliers to ensure authentic taste and freshness.",
    },
    {
      icon: Award,
      title: "Traditional Recipes",
      description: "Our recipes have been passed down through generations, preserving the authentic flavors of Indian cuisine.",
    },
    {
      icon: Users,
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We go the extra mile to make every celebration special.",
    },
    {
      icon: Sparkles,
      title: "Hygiene Standards",
      description: "We maintain the highest standards of cleanliness and food safety in all our outlets.",
    },
  ];

  return (
    <div className="min-h-screen">
      <TopNav />
      <MainNav />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Our Story</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Since 1995, A1B has been serving the finest Indian sweets and savouries, 
              bringing the authentic taste of tradition to celebrations across India.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A1B started as a small family-owned sweet shop with a simple mission: to share the joy of 
                authentic Indian sweets with everyone. What began in a modest kitchen has now grown into 
                a beloved brand with multiple outlets across major cities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our master halwais (sweet makers) bring decades of experience, crafting each sweet and 
                savoury with the same care and precision that has defined our brand for nearly three decades. 
                Every product that leaves our kitchen carries with it the warmth of tradition and the 
                promise of quality.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">1995:</strong> Founded our first outlet in Mumbai, 
                  starting with just 15 varieties of traditional sweets.
                </p>
                <p>
                  <strong className="text-foreground">2005:</strong> Expanded to multiple locations across 
                  Mumbai and introduced our signature savouries range.
                </p>
                <p>
                  <strong className="text-foreground">2015:</strong> Launched gift packaging services and 
                  opened outlets in Delhi, Bangalore, and Pune.
                </p>
                <p>
                  <strong className="text-foreground">2024:</strong> Serving thousands of happy customers 
                  daily with over 100+ varieties of sweets and savouries.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="gradient-text">Our Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="p-6 text-center hover-lift">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Our Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To preserve and celebrate the rich heritage of Indian sweets and savouries, 
              making every celebration sweeter and every moment more memorable. We're committed 
              to maintaining the highest standards of quality while innovating to meet modern tastes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
