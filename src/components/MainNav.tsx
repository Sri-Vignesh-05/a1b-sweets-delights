import { NavLink } from "@/components/NavLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const MainNav = () => {
  return (
    <div className="fixed top-16 left-0 right-0 bg-nav border-b border-border shadow-nav z-40">
      <div className="container mx-auto px-4">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex-wrap justify-center gap-1 py-3">
            <NavigationMenuItem>
              <NavLink
                to="/"
                className="nav-link px-4 py-2 text-sm font-medium"
                activeClassName="text-primary"
              >
                Home
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/about"
                className="nav-link px-4 py-2 text-sm font-medium"
                activeClassName="text-primary"
              >
                About Us
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/sweets"
                className="nav-link px-4 py-2 text-sm font-medium"
                activeClassName="text-primary"
              >
                Sweets
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/savouries"
                className="nav-link px-4 py-2 text-sm font-medium"
                activeClassName="text-primary"
              >
                Savouries
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/bestseller"
                className="nav-link px-4 py-2 text-sm font-medium"
                activeClassName="text-primary"
              >
                Best Seller
              </NavLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavLink
                to="/combo"
                className="nav-link px-4 py-2 text-sm font-medium"
                activeClassName="text-primary"
              >
                Combo & Gifts
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
