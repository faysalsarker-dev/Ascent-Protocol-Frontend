"use client";
import {useState} from "react"
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { LogoutDialog } from "../../shared/LogoutDialog";

interface User {
  name?: string;
  avatar?: string;
  role?: string;
}

interface NavActionProps {
  user: User | null;
}

const NavAction = ({ user }: NavActionProps) => {
  const dashboardLink = user?.role === "admin" ? "/admin" : "/user";
    const [logoutDialog, setLogoutDialog] = useState(false);

  return (
    <div className="flex items-center gap-3 ">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback className="uppercase">
                {user?.name?.slice(0, 2) || "US"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40 mt-5">
            <DropdownMenuItem asChild>
              <Link href={dashboardLink}>Dashboard</Link>
            </DropdownMenuItem>

          
     <LogoutDialog
       open={logoutDialog} onOpenChange={setLogoutDialog} />

            <DropdownMenuItem onClick={()=>setLogoutDialog(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login">
            <Button size="sm" variant="outline">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavAction;