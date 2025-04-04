"use client"
import { useEffect, useState } from "react";
import { RecipeData } from "../page";
import { allRecipe } from "../lib/getRecipe";
import SectionTemplate1 from "../(components)/SectionTemplate/Template1";

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
      <SectionTemplate1 sectionTitle="Menu" recipeData={recipeData}/>
    </div>
  );
}
