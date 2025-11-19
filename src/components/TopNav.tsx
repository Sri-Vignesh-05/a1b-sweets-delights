import { MapPin, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const TopNav = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [selectedOutlet, setSelectedOutlet] = useState("Our Outlets");
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="hidden sm:inline">Login</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Login to A1B</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to access your account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full" onClick={() => setIsLoginOpen(false)}>
                    Login
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <button className="text-primary hover:underline">Sign up</button>
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
