"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserLogin() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    const result = await signIn("credentials",{
      email:login.email,
      password:login.password,
      redirect:false,
/*       callbackUrl:"/menu" */
    })
    console.log("RREESSULT",result)
    if (result?.ok === false) {
      alert("Email or Password was wrong,,,");
      setLogin({email:'',password:''})
    } else {
      redirect('/menu');
    }
  };

  return (
    <div
      className={`[w-full max-w-md space-y-4 rounded-lg p-6 lg:w-[25rem] h-[27rem] flex flex-col justify-around] bg-white border-1 border-black shadow-md`} // Applying the new class
    >
      <input
        className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
        type="Email"
        placeholder="yourEmail@sample.com"
        value={login.email}
        onChange={(e)=> setLogin({ ...login,email:e.target.value})}
        required
      />
      <input
        className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
        type="password"
        placeholder="password"
        value={login.password}
        onChange={(e)=>setLogin({...login,password:e.target.value})}
        required
      />

      <button
        className="rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed]"
        onClick={loginHandler}
      >
        Login
      </button>
    </div>
  );
}