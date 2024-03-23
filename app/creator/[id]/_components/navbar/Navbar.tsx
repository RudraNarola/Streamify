import Logo from "./Logo";
import Action, { UserButtonSkeleton } from "./Action";
import { Suspense } from "react";



const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-[#1b1d24] px-2 lg:px-4 flex justify-between items-center shadow-sm gap-3">
      <Logo  />
      
      <Suspense fallback ={<UserButtonSkeleton/>}>

      <Action />
      </Suspense>
    </div>
  );
};

export default Navbar;
