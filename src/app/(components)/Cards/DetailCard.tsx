import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BLOCKS } from '@contentful/rich-text-types'
import { RecipeData } from "@/app/lib/getRecipe";
import { CloseBtn } from "../SVGs/Svg";
import Styles from "./Cards.module.css"
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface recipeProps {
  recipe:RecipeData
  onCloseButtonClick:(value:boolean)=>void
}

export default function DetailCard({recipe,onCloseButtonClick}:recipeProps) {
  const { data: session } = useSession()
  const [count,setCount] = useState<number>(0)
  const decreaseBtnRef = useRef<HTMLButtonElement>(null)
  const cart = useCartStore((state) => state.cart)
  const addCart = useCartStore((state) => state.addCart)

  useEffect(()=>{
    if(decreaseBtnRef.current){
      if(count<1){
        decreaseBtnRef.current.style.backgroundColor="#aaaaaa"
      } else{
        decreaseBtnRef.current.style.backgroundColor="black"
      }
    }
  },[count])

  useEffect(() => {
    const existingItem = cart.find(
      (item) => item.menu.recipeId === recipe.recipeId
    );
    
    if (existingItem) {
      setCount(existingItem.amount);
    } else{
      setCount(0)
    }
  }, [cart, recipe.recipeId]);

  const handleCloseBtnClick = () => {
    onCloseButtonClick(true);
  }

  const addCartHandler = () => {
    if(session?.user.username !== "Guest"){
      alert("Please Sing up to order!!")
    } else {
      if(count<1){
        alert("Plese select amount");
      }else{
        addCart(
          { 
              menu:recipe,
              amount:count,
              price:count*recipe.recipePrice
          })
        alert("Added to Cart");
        onCloseButtonClick(true);
      }
    }
  }

  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };
  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count-1)
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/70 z-20">
        <div className={`relative top-[5%] left-[90%] ${Styles.closeBtn}`} onClick={handleCloseBtnClick}>
          <CloseBtn/>
        </div>
        <div className={`fixed w-[90vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 border-1 border-black shadow-md rounded-md  bg-[#fefefe] ${Styles.detailCardContainer}`}>
          <div className={`flex gap-[1rem] ${Styles.detailCard}`}>
            <div>
              <Image
                className={`h-[100%] object-cover m-auto rounded-l-md border-r-1 border-black ${Styles.detailCardImg}`}
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                width={290}
                height={290}
                priority
              />
            </div>
            <div className={`mx-[1rem] py-[1rem] ${Styles.detailTextContainer}`}>
              <h3 className={`text-2xl font-bold mt-[1rem] ${Styles.detailTitle}`}>{recipe.recipeName}</h3>
              <p className={`text-xl font-bold mb-[0.5rem] ${Styles.detailPlice}`}>${recipe.recipePrice}</p>
              <div className={`${Styles.detailContents}`}>
                {documentToReactComponents({
                    nodeType: BLOCKS.DOCUMENT,
                    content: recipe.recipeDescription,
                    data: {}
                  })}
              </div>
              <div className="max-w-[100%] flex justify-around items-center mt-[2rem]">
                <div className="flex gap-x-[1rem] items-center">
                  <button ref={decreaseBtnRef} className="flex w-[25px] h-[25px] justify-center items-center text-lg font-bold bg-black text-white rounded-[50%]" onClick={decrement} disabled={count<1}><p className="translate-y-[-1px]">-</p></button>
                  <input
                    type="number"
                    value={count}
                    onChange={countHandler}
                    className="w-[60px] text-center border-1 border-black rounded-md bg-[#ededed] py-[0.2rem]"
                  />
                  <button className="flex w-[25px] h-[25px] justify-center items-center text-lg font-bold bg-black text-white rounded-[50%]" onClick={increment}>+</button>
                </div>
                <button className={`text-white bg-green-500 px-[0.5rem] py-[0.5rem] border-1 border-black rounded-md ${Styles.addBtn}`} onClick={addCartHandler}>Add Cart</button>
              </div>
            </div>
          </div>
        </div>          
      </div>
    </>
  );
}