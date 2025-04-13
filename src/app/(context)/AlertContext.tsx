"use client"

import { createContext, useContext, useState } from "react";

type AlertState = {
  isShowAlert:boolean;
  message:string;
  changeAlertStatus:(value:boolean)=>void;
  addMsg:(msg:string)=>void;
}

const AlertContext = createContext<AlertState | undefined>(undefined);

const AlertContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isShowAlert,setIsShowAlert] = useState(false)
  const [message,setMessage] = useState("");

  const changeAlertStatus = (value:boolean)=>{
    setIsShowAlert(value)
  }
  const addMsg = (msg:string)=>{
    setMessage(msg)
  }

  const value = {isShowAlert,message,addMsg, changeAlertStatus}

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}

const useAlertContext = ():AlertState => {
  const context = useContext(AlertContext);
  if(!context){
    throw new Error("useAlertContex must be used within a CounterContextProvider");
  }
  return context;
}

export {AlertContextProvider, useAlertContext}