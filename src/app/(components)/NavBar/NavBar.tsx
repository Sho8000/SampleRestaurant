"use client"

import Link from "next/link";
import { LoginBtn } from "../Button/LoginLogout";
import { useSession } from "next-auth/react";
import YesNoAlert from "../Button/YesNoAlert";
import { FaShoppingCart } from "react-icons/fa";
import Styles from "./Navbar.module.css"
import { useCartPageContext } from "@/app/(context)/CartIconContext";

export default function NavBar() {
  const { data: session } = useSession()
  const {isCartPage,changeCartPageStatus} = useCartPageContext();

  
  const cartIconHandler = () => {
    if (isCartPage) {
      changeCartPageStatus(false);
    } else {
      changeCartPageStatus(true);
    }
  }

  return (
    <>
      <nav className="w-[100%] fixed bg-white/50 text-[#0a0a0a] backdrop-blur-md top-0 left-0 z-10 py-[1rem]">
      <div className={`flex justify-between items-center mx-[1rem] ${Styles.navContents}`}>
        <div>
          <Link
            href={"/"}
          >
            <h2 className="font-bold">NextJS Sample Restaurant</h2>
          </Link>
        </div>
        <div>
          <ul className="flex items-center gap-[1rem]">
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
            {session && <FaShoppingCart size={24} onClick={cartIconHandler}/>}
            {session?
              (<YesNoAlert/>)
              :(<LoginBtn/>)
            }
            
          </ul>
        </div>
      </div>
      </nav>

      {/* This is for adjusting height */}
      <nav className="w-[100%] bg-white/50 text-white/50 py-[1rem]">
        <div className={`flex justify-between items-center mx-[1rem] ${Styles.navContents}`}>
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