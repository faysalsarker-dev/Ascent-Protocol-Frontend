import AppBar from "@/src/components/shared/AppBar";


export default function userLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="main-background min-h-screen  px-4">
  
        {children}
        <AppBar/>
    </main>
  );
}
