"use client"

import { useCartPageContext } from "@/app/(context)/CartIconContext";
import { CloseBtn } from "../SVGs/Svg";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cart as contexCart, useCartStore } from "@/store/cartStore";
import { useAlertContext } from "@/app/(context)/AlertContext";
import AlertCard from "../Cards/AlertCard";

export default function Cart() {
  const {isCartPage,changeCartPageStatus} = useCartPageContext()
  const cartPageRef = useRef<HTMLDivElement>(null);
  const cart = useCartStore((state) => state.cart)
  const totalPrice = useCartStore((state) => state.totalPrice)
  const addCart = useCartStore((state) => state.addCart)
  const removeItem = useCartStore((state) => state.removeItem)
  const deleteCartItems = useCartStore((state) => state.deleteCartItems)
  const [clickedPurchase,setClickedPurchase] = useState(false);
  const [paymentWay,setPaymentWay] = useState<string|null>(null)
  const [is_eTransfar,setIs_eTransfar] = useState(false)
  const {isShowAlert,message,addMsg,changeAlertStatus} = useAlertContext()

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

  const decrement = (cart:contexCart) => {
    if(cart.amount<=1){
      addCart(
        { 
          menu:cart.menu,
          amount:cart.amount-1,
          price:(cart.amount-1)*cart.menu.recipePrice
        })
      removeItem(cart.menu.recipeId)
    }else{
      addCart(
        { 
          menu:cart.menu,
          amount:cart.amount-1,
          price:(cart.amount-1)*cart.menu.recipePrice
        })
    }
  }

  const increment = (cart:contexCart) => {
    addCart(
      { 
        menu:cart.menu,
        amount:cart.amount+1,
        price:(cart.amount+1)*cart.menu.recipePrice
      })
  }

  const purchaseBtnHandler = () => {
    if(!paymentWay){
      addMsg("Please choose the payment way!!")
      changeAlertStatus(true)

      return
    }
    if(paymentWay==="Pay in Cash"){
      addMsg(`Order placed! We'll start preparing your meal once payment is received.`)
      changeAlertStatus(true)

    }else{
      addMsg(`Order placed! We'll start once paid—ready in ~15 mins.`)
      changeAlertStatus(true)
    }
    deleteCartItems();
    setPaymentWay(null)
    changeCartPageStatus(false);
    setIs_eTransfar(false);
  }

  const gotopurchaseHandler = () => {
    setClickedPurchase(true);
  }

  return (
    <>
      <div ref={cartPageRef} className="fixed w-[100%] max-w-[426px] min-h-[100%] top-0 left-[100%] bg-[#ededed] border-1 border-gray-500 rounded-l-md z-20" style={{transition: 'transform 0.3s ease'}}>
        <div className="text-end mr-[1rem] mt-[1rem]" onClick={closeBtnHandler}>
          <CloseBtn color="black"/>
        </div>
        <div className="h-auto max-h-[calc(100vh-150px)] overflow-y-scroll">
          <div>
            <h2 className="text-xl font-bold text-center underline">🛒 Your Cart 🛒</h2>
          </div>
          <div>
            {cart.length === 0 ? 
            (<p className="text-center mt-[1rem]">Your cart is empty,,,</p>)
            :(
              <>
                {cart.map((item,index)=>{
                  return <div key={index} className="flex w-[90%] border-1 border-black rounded-md m-auto mt-[1rem]">
                    <Image
                      className="rounded-l-md"
                      src={item.menu.recipeImage}
                      alt={item.menu.recipeName}
                      width={100}
                      height={100}
                    />
                    <div className="w-full m-[1rem]">
                      <h3 className="text-lg font-bold">{item.menu.recipeName}</h3>
                      <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                          <p className=" font-bold">Qty {item.amount}</p>
                          <button className="flex w-[17px] h-[17px] justify-center items-center text-lg font-bold bg-black text-white rounded-[50%]" onClick={()=>{decrement(item)}} disabled={item.amount<1}><p className="translate-y-[-1px]">-</p></button>
                          <button className="flex w-[17px] h-[17px] justify-center items-center text-lg font-bold bg-black text-white rounded-[50%]" onClick={()=>{increment(item)}}>+</button>

                        </div>
                        <p className="font-bold">${item.menu.recipePrice}</p>
                      </div>
                    </div>
                  </div>
                })}
                <div className="mt-[2rem] text-right mr-[1rem]">
                  <p className="text-sm">Price: ${totalPrice}</p>
                  <p className="text-sm">Tax: ${parseFloat(Number(totalPrice*0.15).toFixed(2)) }</p>
                  <h2 className="text-xl font-bold">Total Price: ${totalPrice+totalPrice*0.15}</h2>
                </div>
                <div className="text-center mt-[2rem]">
                {clickedPurchase ? (<>
                  <div className="w-[100%] space-y-4 border-y-1 border-dashed border-black py-[1rem]">
                    <h2 className="text-xl font-bold text-center">How do you pay?</h2>
                    <div className="w-[80%] flex items-center space-x-3 m-auto">
                      <input
                        type="radio"
                        id="e-transfer"
                        name="paymentWay"
                        value="e-Transfer"
                        className="h-5 w-5"
                        onChange={(e)=> {
                          setPaymentWay(e.target.value)
                          setIs_eTransfar(true)
                        }
                      }
                    />
                      <label htmlFor="e-transfer" className="text-lg">e-Transfer</label>
                    </div>

                    {is_eTransfar && 
                      <div className="w-[80%] text-left m-auto mb-[0.5rem]">
                        <p>Send payment to this phone number:</p>
                        <p className="font-bold">(123)456-7890</p>
                      </div>
                    }
                    
                    <div className="w-[80%] flex items-center space-x-3 m-auto">
                      <input
                        type="radio"
                        id="cash"
                        name="paymentWay"
                        value="Pay in Cash"
                        className="h-5 w-5"
                        onChange={(e)=> {
                            setPaymentWay(e.target.value)
                            setIs_eTransfar(false)
                          }
                        }
                      />
                      <label htmlFor="cash" className="text-lg">Pay in Cash</label>
                    </div>
                  </div>
                  <button className={`w-[50%] text-white bg-green-500 py-[0.5rem] mt-[2rem] border-1 border-black rounded-md`} onClick={purchaseBtnHandler} >Purchase</button>
                </>):(<>
                  <button className={`w-[50%] text-white bg-green-500 py-[0.5rem] border-1 border-black rounded-md`} onClick={gotopurchaseHandler} >Go to Purchase</button>
                </>)}

                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isShowAlert && 
        <AlertCard message={message}/>
      }
      
    </>
  );
}



