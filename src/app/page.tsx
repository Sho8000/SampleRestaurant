"use client"
import { useEffect, useState } from "react";
import Hero from "./(components)/Hero/Hero/Hero";
import { allRecipe } from "./lib/getRecipe";
import SectionTemplate1 from "./(components)/SectionTemplate/Template1";
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface RecipeData {
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
  },[setRecipeData])

  return (
    <div>
      <Hero/>
      <SectionTemplate1 sectionTitle="Featured Dishes" howMany={3} recipeData={recipeData}/>
    </div>
  );
}
