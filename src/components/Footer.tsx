import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">A1B</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted destination for authentic Indian sweets and savouries
              since 1995. Bringing the taste of tradition to your celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Order Online
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">+91 123 456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">info@a1bsweets.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Main Street, Mumbai, Maharashtra 400001
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Monday - Saturday</p>
                  <p className="font-medium">9:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">Sunday</p>
                  <p className="font-medium">10:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 A1B Sweets & Savouries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
