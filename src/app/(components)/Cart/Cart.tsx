"use client"

import { useCartPageContext } from "@/app/(context)/CartIconContext";
import { CloseBtn } from "../SVGs/Svg";
import { useEffect, useRef } from "react";

export default function Cart() {
  const {isCartPage,changeCartPageStatus} = useCartPageContext()
  const cartPageRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(cartPageRef.current){
      if(isCartPage){
        cartPageRef.current.style.transform = `translateX(-100%)`
      }else{
        cartPageRef.current.style.transform = `translateX(0%)`
      }
    }
  },[isCartPage])

  const closeBtnHandler = () => {
    changeCartPageStatus(false)
  }
  return (
    <div ref={cartPageRef} className="fixed w-[100%] max-w-[426px] min-h-[100%] top-0 left-[100%] bg-[#ededed] border-1 border-gray-500 rounded-l-md z-20" style={{transition: 'transform 0.3s ease'}}>
      <div className="text-end mr-[1rem] mt-[1rem]" onClick={closeBtnHandler}>
        <CloseBtn color="black"/>
      </div>
      <div>
        <h2 className="text-xl font-bold text-center underline">Your Cart</h2>
      </div>
      <div>
        <p className="text-center mt-[1rem]">Your cart is empty,,,</p>
      </div>
    </div>
  );
}



