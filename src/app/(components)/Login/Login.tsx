"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AlertCard from "../Cards/AlertCard";
import { useAlertContext } from "@/app/(context)/AlertContext";

export default function UserLogin() {
  const [login, setLogin] = useState({
    useremail: "",
    password: "",
  });
  const [signupBtn,setSignupBtn]=useState(false);
  const [signup, setSignup] = useState({
    username:"",
    useremail: "",
    password: "",
    passwordConfirmation:"",
  });
  const {isShowAlert,message,changeAlertStatus,addMsg} = useAlertContext()

  const loginAsGest = async () => {
    const result = await signIn("credentials",{
      useremail:"email1@123",
      password:"email1@123",
      redirect:false,
    })
    if (result?.ok === false) {
      addMsg("Email or Password was wrong,,,")
      changeAlertStatus(true)
      setLogin({useremail:'',password:''})
    } else {
      setLogin({useremail:'',password:''})
      window.location.href = "/menu";
    }
  }

  const loginHandler = async () => {
    const result = await signIn("credentials",{
      useremail:login.useremail,
      password:login.password,
      redirect:false,
/*       callbackUrl:"/menu" */
    })
    if (result?.ok === false) {
      addMsg("Email or Password was wrong,,,")
      changeAlertStatus(true)
      setLogin({useremail:'',password:''})
    } else {
      setLogin({useremail:'',password:''})
      window.location.href = "/menu";
    }
  };

  const signupBtnHandler = (value:boolean) => {
    setLogin({
      useremail:"",
      password:"",
    })
    setSignup({
      username:"",
      useremail:"",
      password:"",
      passwordConfirmation:"",
    })
    setSignupBtn(value)
  }

  const signupHandler = async () => {
    if(!signup.username || !signup.useremail || !signup.password || !signup.passwordConfirmation){
      addMsg("Please input all information,,,")
      changeAlertStatus(true)
      return null;
    }
    if(signup.password!==signup.passwordConfirmation){
      addMsg("Please input same password,,,")
      changeAlertStatus(true)
      setSignup({
        ...signup,
        password:"",
        passwordConfirmation:"",
      })
      return null;
    }
    
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username:signup.username, useremail:signup.useremail, password:signup.password }),
    });

    if(response.ok) {
      setSignup({
        username:"",
        useremail:"",
        password:"",
        passwordConfirmation:"",
      })
      loginHandler();
    } else {
      console.log("signup error, please change email address...");
    }
  }

  return (
    <>
      <div
        className={`[w-full max-w-md h-auto space-y-4 rounded-lg p-6 lg:w-[25rem] flex flex-col justify-around] bg-white border-1 border-black shadow-md`} // Applying the new class
      >
        {!signupBtn?(
          <>
            <h2 className="text-2xl font-bold text-center">Login</h2>
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
            <button
              className="rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed]"
              onClick={loginHandler}
            >
              Login
            </button>
            <p className="text-center">login as <span className="text-blue-500 cursor-pointer" onClick={loginAsGest}>Guest</span>? or Sign up</p>
            <button className="text-blue-400 cursor-pointer" onClick={()=>{signupBtnHandler(true)}}>Sign up</button>
          </>):(<>
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <input
              className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
              type="text"
              placeholder="name or nickname"
              value={signup.username}
              onChange={(e)=> setSignup({ ...signup,username:e.target.value})}
              required
            />
            <input
              className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
              type="Email"
              placeholder="yourEmail@sample.com"
              value={signup.useremail}
              onChange={(e)=> {setSignup({ ...signup,useremail:e.target.value}); setLogin({...login,useremail:e.target.value})}}
              required
            />
            <input
              className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
              type="password"
              placeholder="password"
              value={signup.password}
              onChange={(e)=> {setSignup({...signup,password:e.target.value}); setLogin({...login,password:e.target.value})}}
              required
            />
            <input
              className="bg-[#ededed] border-1 border-black/50 shadow-md p-[10px] rounded-sm"
              type="password"
              placeholder="password confirmation"
              value={signup.passwordConfirmation}
              onChange={(e)=>setSignup({...signup,passwordConfirmation:e.target.value})}
              required
            />
            <button
              className="rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed]"
              onClick={signupHandler}
            >
              Sign Up
            </button>   
            <p className="text-center mb-0">Login with your account</p>
            <button className="text-blue-400 cursor-pointer" onClick={()=>{signupBtnHandler(false)}}>Login?</button>     
          </>)}
      </div>

      {isShowAlert && 
        <AlertCard message={message}/>
      }

    </>
  );
}