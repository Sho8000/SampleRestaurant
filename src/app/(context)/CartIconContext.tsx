"use client"

import { createContext, useContext, useState } from "react";

type CartPageState = {
  isCartPage:boolean;
  changeCartPageStatus:(value:boolean)=>void;
}

const CartPageContext = createContext<CartPageState | undefined>(undefined);

const CartPageContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [isCartPage,setIsCartPage] = useState(false)

  const changeCartPageStatus = (value:boolean)=>{
    setIsCartPage(value)
  }

  const value = {isCartPage, changeCartPageStatus}

  return (
    <CartPageContext.Provider value={value}>
      {children}
    </CartPageContext.Provider>
  )
}

const useCartPageContext = ():CartPageState => {
  const context = useContext(CartPageContext);
  if(!context){
    throw new Error("useCartPageContex must be used within a CounterContextProvider");
  }
  return context;
}

export {CartPageContextProvider, useCartPageContext}