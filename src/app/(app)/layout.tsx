import Navbar from "@/components/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <Navbar />
    <main className="mt-20">{children}</main>
  </>);
}
