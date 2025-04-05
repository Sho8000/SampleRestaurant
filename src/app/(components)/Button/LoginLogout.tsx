"use client"
import { signIn, signOut } from "next-auth/react"

export const LoginBtn = () => {
  return <button className="bg-[#0a0a0a] text-[#ededed] px-[0.5rem] py-[0.2rem] rounded-md"
  onClick={()=> signIn()}
  >
  Sign In
  </button>
}

export const LogoutBtn = () => {
  return <button className="bg-[#0a0a0a] text-[#ededed] px-[0.5rem] py-[0.2rem] rounded-md"
  onClick={()=> signOut()}
  >
    Sign Out
  </button>
}
