import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="mt-20">{children}</div>
    </>
  );
}
