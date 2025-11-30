

export default function commonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" min-h-screen flex flex-col items-center justify-center px-4">
  
        {children}
    
    </main>
  );
}
