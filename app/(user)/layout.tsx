import { Suspense } from "react";
import Navbar from "./_components/navbar/Navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar/Sidebar";
import { Container } from "./_components/container";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="h-full flex flex-row mt-16 lg:mt-20 ">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </main>
    </>
  );
}
