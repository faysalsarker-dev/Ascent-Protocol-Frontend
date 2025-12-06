import AppBarContent from "../modules/appbar/AppbarContent";





export type INavItem = {
  href: string;
  icon: string;
  label: string;
};

const navItems: INavItem[] = [
  { href: "/user/home", icon: "Home", label: "Home" },
  { href: "/user/my-workout", icon: "Dumbbell", label: "Workout" },
  { href: "/user/dashboard", icon: "LayoutDashboard", label: "Dashboard" },
  { href: "/user/profile", icon: "User", label: "Profile" },
];

export default function AppBar() {
  return <AppBarContent navItems={navItems} />;
}
