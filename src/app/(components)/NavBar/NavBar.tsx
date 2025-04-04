import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="w-[100%] fixed bg-white/50 text-[#0a0a0a] backdrop-blur-md top-0 left-0 z-10 py-[1rem]">
      <div className="flex justify-between items-center mx-[1rem]">
        <div>
          <Link
            href={"/"}
          >
            <h2 className="font-bold">NextJS Sample Restaurant</h2>
          </Link>
        </div>
        <div>
          <ul className="flex gap-[1rem]">
            <Link
              href={"/"}
            >
              <li>Home</li>
            </Link>
            <Link
              href={"/menu"}
            >
              <li>Menu</li>
            </Link>
            <Link
              href={"/"}
            >
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
      </nav>

      {/* This is for adjusting height */}
      <nav className="w-[100%] bg-white/50 text-white/50 py-[1rem]">
        <div className="flex justify-between mx-[1rem]">
          <div>
            <h2 className="font-bold">NextJS Sample Restaurant</h2>
          </div>
          <div>
            <ul className="flex gap-[1rem]">
              <li>Home</li>
              <li>Menu</li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}