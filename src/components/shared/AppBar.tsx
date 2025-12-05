import AppBarContent from "../modules/appbar/AppbarContent";




export type INavItem = {
  href: string;
  icon: string;
  label: string;
};



const navItems:INavItem[] = [
  { href: '/user/home', icon: "Home", label: 'Home' },
  { href: '/user/my-workout', icon: "Home", label: 'Home' },
  { href: '/user/dashboard', icon: "Home", label: 'Home' },
  { href: '/user/profile', icon: "Home", label: 'Home' },
  
];


export default function AppBar() {

  return ( <AppBarContent navItems={navItems} /> );
}