import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <p>Home Page</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
