import { Suspense } from "react";
import Navbar from "./_components/navbar/Navbar";
import Sidebar from "./_components/sidebar/Sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="h-full flex flex-row mt-20">
        {/* <Suspense fallback={<CreatorSidebarSkeleton />}> */}
        <Sidebar />
        {/* </Suspense> */}

        {children}
      </main>
    </>
  );
}
