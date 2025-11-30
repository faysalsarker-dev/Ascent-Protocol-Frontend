import AppBar from "@/src/components/shared/AppBar";


export default function userLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="main-background min-h-screen flex flex-col items-center justify-center px-4">
  
        {children}
        <AppBar/>
    </main>
  );
}
