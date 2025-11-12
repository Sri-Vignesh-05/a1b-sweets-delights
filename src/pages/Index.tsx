import { TopNav } from "@/components/TopNav";
import { MainNav } from "@/components/MainNav";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopNav />
      <MainNav />
      
      {/* Main Content - with top margin to account for fixed navbars */}
      <main className="pt-32">
        <div className="container mx-auto px-4">
          <HeroCarousel />
        </div>
        
        <CategorySection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
