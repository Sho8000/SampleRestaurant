"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

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

  const loginHandler = async () => {
    const result = await signIn("credentials",{
      useremail:login.useremail,
      password:login.password,
      redirect:false,
/*       callbackUrl:"/menu" */
    })
    if (result?.ok === false) {
      alert("Email or Password was wrong,,,");
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
      alert("Please input all information,,,");
      return null;
    }
    if(signup.password!==signup.passwordConfirmation){
      alert("Please input same password,,,");
      setSignup({
        ...signup,
        password:"",
        passwordConfirmation:"",
      })
      return null;
    }
    
    const response = await fetch("http://localhost:3000/api/user", {
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
          <p>*sampleEmail&password: <span className="text-red-600">email1@123</span></p>
          <button
            className="rounded-sm p-[10px] bg-[#0a0a0a] text-[#ededed]"
            onClick={loginHandler}
          >
            Login
          </button>
          <p className="text-center">or Sign up</p>
          <button onClick={()=>{signupBtnHandler(true)}}>Sign up</button>
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
          <p className="text-center">Login with your account</p>
          <button onClick={()=>{signupBtnHandler(false)}}>Login</button>     
        </>)}
    </div>
  );
}