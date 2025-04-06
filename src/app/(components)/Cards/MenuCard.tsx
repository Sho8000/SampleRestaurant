import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BLOCKS } from '@contentful/rich-text-types'
import { RecipeData } from "@/app/lib/getRecipe";
import DetailCard from "./DetailCard";
import { useEffect, useRef, useState } from "react";

interface recipeProps {
  recipeData:RecipeData[]
  detail:boolean
}

export default function MenuCard({recipeData,detail}:recipeProps) {
  const [clickedRecipe,setClickedRecipe] = useState<RecipeData|null>(null);
  const [clickedDetailClose,setClickedDetailClose] = useState<boolean>(false);
  const detailRef = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    if(detailRef.current){
      if(clickedDetailClose){
        setClickedDetailClose(false)
        detailRef.current.style.display = "none"
      } 
    }
  },[clickedDetailClose])

  const menuDetail = (item:RecipeData) => {
    if(detail){
      setClickedRecipe(item)
      if(detailRef.current){
        detailRef.current.style.display = "block"
      }
    }
  }
  
  const handleCloseBtnClick = () => {
    setClickedDetailClose(true);
  }

  return (
    <>
      {recipeData.map((item,index)=><div key={index} className="w-[300px] border-1 border-black shadow-md rounded-md px-[20px] py-[10px] bg-[#fefefe]" onClick={()=>{menuDetail(item)}}>
        <Image
          className="m-auto my-[10px] rounded-md"
          src={item.recipeImage}
          alt={item.recipeName}
          width={290}
          height={290}
          priority
          style={{height:"170px"}}
        />
        <h3 className="text-2xl font-bold mt-[1rem]">{item.recipeName}</h3>
        <p className="text-xl font-bold mb-[0.5rem]">${item.recipePrice}</p>
        {documentToReactComponents({
            nodeType: BLOCKS.DOCUMENT,
            content: item.recipeDescription,
            data: {}
          })}
      </div>)}
      {clickedRecipe?
        (<div ref={detailRef}>
          <DetailCard recipe={clickedRecipe} onCloseButtonClick={handleCloseBtnClick}/>
        </div>)
        :(<></>)}
    </>
  );
}



