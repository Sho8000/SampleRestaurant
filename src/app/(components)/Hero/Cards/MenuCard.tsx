import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BLOCKS } from '@contentful/rich-text-types'
import { RecipeData } from "@/app/page";

interface recipeProps {
  recipeData:RecipeData[]
}

export default function MenuCard({recipeData}:recipeProps) {

  return (
    <>
      {recipeData.map((item,index)=><div key={index} className="w-[300px] border-1 border-black rounded-md px-[20px] py-[10px]">
        <Image
          className="m-auto my-[10px] rounded-md"
          src={item.recipeImage}
          alt={item.recipeName}
          width={290}
          height={290}
          priority
        />
        <h3 className="text-2xl font-bold my-[1rem]">{item.recipeName}</h3>
        {documentToReactComponents({
            nodeType: BLOCKS.DOCUMENT,
            content: item.recipeDescription,
            data: {}
          })}
      </div>)}        
    </>
  );
}



