import { MapPin, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const TopNav = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [selectedOutlet, setSelectedOutlet] = useState("Our Outlets");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-nav border-b border-border shadow-nav z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Location & Outlets */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">{selectedLocation}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-card">
                <DropdownMenuItem onClick={() => setSelectedLocation("Mumbai")}>Mumbai</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Delhi")}>Delhi</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Bangalore")}>Bangalore</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Pune")}>Pune</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="hidden sm:inline">{selectedOutlet}</span>
                  <span className="sm:hidden">Outlets</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card">
                <DropdownMenuItem onClick={() => setSelectedOutlet("Andheri West Store")}>Andheri West Store</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOutlet("Bandra East Store")}>Bandra East Store</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOutlet("Juhu Beach Road")}>Juhu Beach Road</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedOutlet("Powai Central")}>Powai Central</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">A1B</h1>
          </div>

          {/* Right: Customer Care, Login, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:+911234567890"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline text-sm">+91 123 456 7890</span>
            </a>

            <Button variant="ghost" size="sm" onClick={handleAuthClick}>
              <span className="hidden sm:inline">{user ? "Logout" : "Login"}</span>
              <span className="sm:hidden">{user ? "Logout" : "Login"}</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
