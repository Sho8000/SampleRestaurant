import { useAlertContext } from "@/app/(context)/AlertContext";
import { useEffect, useRef } from "react";

interface AlertProps {
  message:string;
}

export default function AlertCard({message}:AlertProps) {
  const alertDivRef = useRef<HTMLDivElement>(null)
  const {isShowAlert,changeAlertStatus} = useAlertContext();
  useEffect(()=>{
    if(alertDivRef.current){
      if(isShowAlert){
        alertDivRef.current.style.display = "block"
      } else{
        alertDivRef.current.style.display = "none"
      }
    }
  },[alertDivRef,isShowAlert])

  const handleOK = () => {
    changeAlertStatus(false);
  };

  return (
    <>
      <div ref={alertDivRef} className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex justify-center items-center z-20">
        <div className="w-[90%] max-w-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#ededed] p-[20px] rounded-md text-center">
          <p>{message}</p>
          <div className="flex justify-center gap-[1rem] mt-[1rem]">
            <button className="w-[100px] bg-[#0a0a0a] text-[#ededed] px-[0.5rem] py-[0.2rem] rounded-md cursor-pointer" onClick={handleOK}>OK</button>
          </div>
        </div>
      </div>
    </>
  );
}
