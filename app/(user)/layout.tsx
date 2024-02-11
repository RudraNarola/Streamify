import { Suspense } from "react";
import Navbar from "./_components/navbar/Navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar/Sidebar";
import { UserButtonSkeleton } from "./_components/navbar/Action";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
      
      <Navbar />
      
    
      <main className="h-full flex flex-row mt-20">
        <Suspense fallback={<SidebarSkeleton />}>

        <Sidebar />
        </Suspense>
        {children}  
      </main>
      {/* <Footer /> */}
    </>
  );
}
