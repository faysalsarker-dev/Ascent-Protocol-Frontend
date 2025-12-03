import AppBar from "@/src/components/shared/AppBar";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";


export default function userLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ReactQueryProvider>
      <main className="main-background min-h-screen ">
        {children}
        <AppBar />
      </main>
    </ReactQueryProvider>
  );
}


