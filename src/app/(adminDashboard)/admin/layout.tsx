import ReactQueryProvider from "@/src/providers/ReactQueryProvider";
import { AdminSidebar } from "./_components/AdminSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { Separator } from "@/src/components/ui/separator";


export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ReactQueryProvider>

    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>

    </ReactQueryProvider>
  );
}
