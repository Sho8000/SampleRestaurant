"use client"
import { useEffect, useState } from "react";
import Hero from "./(components)/Hero/Hero/Hero";
import { allRecipe } from "./lib/getRecipe";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document as RichTextDocument, BLOCKS } from '@contentful/rich-text-types'

interface RecipeData {
  recipeName: string;
  recipeImage: string;
  recipeDescription: RichTextDocument["content"];
  recipePrice: number;
  recipeCategory: string;
  recipeIngredients: string;
}

export default function Home() {
  const [recipeData,setRecipeData] = useState<RecipeData[]>([])
  useEffect(()=>{
    const getData = async () => {

      const data = await allRecipe()
      setRecipeData(data)
      console.log("This is Recipe Data",data)

    }
    getData()
  },[])

  return (
    <div>
      <Hero/>
      {recipeData.length!==0?(<>
        {documentToReactComponents({
            nodeType: BLOCKS.DOCUMENT,
            content: recipeData[0].recipeDescription,
            data: {}
          })}
      </>):(<></>)}
    </div>
  );
}
