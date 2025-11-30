import AppBarContent from "../modules/appbar/AppbarContent";




export type INavItem = {
  href: string;
  icon: string;
  label: string;
};



const navItems:INavItem[] = [
  { href: '/', icon: "Home", label: 'Home' },
  { href: '/trips', icon: "Zap", label: 'Trips' },
  { href: '/map', icon: "Map", label: 'Map' },
  { href: '/user/dashboard', icon: "ShoppingCart", label: 'Shop' },
  { href: '/settings', icon: "Settings", label: 'Settings' },
];


export default function AppBar() {

  return ( <AppBarContent navItems={navItems} /> );
}