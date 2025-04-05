"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function UserLogin() {
  const [login, setLogin] = useState({
    useremail: "",
    password: "",
  });

  const loginHandler = async () => {
    const result = await signIn("credentials",{
      useremail:login.useremail,
      password:login.password,
      redirect:false,
/*       callbackUrl:"/menu" */
    })
    console.log("RREESSULT",result)
    if (result?.ok === false) {
      alert("Email or Password was wrong,,,");
      setLogin({useremail:'',password:''})
    } else {
      setLogin({useremail:'',password:''})
      window.location.href = "/menu";
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
        value={login.useremail}
        onChange={(e)=> setLogin({ ...login,useremail:e.target.value})}
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
      <p>*sampleEmail&password: <span className="text-red-600">email1@123</span></p>
      <button
        className="rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed]"
        onClick={loginHandler}
      >
        Login
      </button>
    </div>
  );
}