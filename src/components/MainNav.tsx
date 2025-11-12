import { NavLink } from "@/components/NavLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const MainNav = () => {
  const sweetCategories = [
    "Traditional Sweets",
    "Dry Fruits Sweets",
    "Milk-based Sweets",
    "Bengali Sweets",
    "Festival Special",
  ];

  const savouryCategories = [
    "Samosas & Kachoris",
    "Namkeens",
    "Chaklis & Murukku",
    "Mixture",
    "Gathiya",
  ];

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
              <NavigationMenuTrigger className="text-sm font-medium">
                Sweets
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4 bg-card">
                  {sweetCategories.map((category) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {category}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium">
                Savouries
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4 bg-card">
                  {savouryCategories.map((category) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {category}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
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
