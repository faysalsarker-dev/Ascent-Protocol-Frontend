import ReactQueryProvider from "@/src/providers/ReactQueryProvider";


export default function chatLayout({
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


