import ReactQueryProvider from "@/src/providers/ReactQueryProvider";


export default function authLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <ReactQueryProvider>
      <main>
        {children}
      </main>
    </ReactQueryProvider>
  );
}


