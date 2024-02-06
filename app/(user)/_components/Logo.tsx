import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href="/">
      <div className="flex h-full items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-2">
          <Image src="/logo8.png" alt="Logo" height={32} width={32} />
        </div>
        <div className="hidden lg:block">
          <p className="font-bold">Streamify</p>
          <p className="text-muted-foreground text-xs">Play & Stream</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
