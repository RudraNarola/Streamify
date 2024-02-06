import Logo from "./Logo";
import Search from "./Search";
import Action from "./Action";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 z-[49] bg-[#1b1d24] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Action />
    </div>
  );
};

export default Navbar;
