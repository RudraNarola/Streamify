import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";




export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <Navbar />

      <main className="h-full flex flex-row mt-20">


        <Sidebar />

        {children}
      </main>
    </>
  );
}