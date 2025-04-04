"use client"
import { useEffect } from "react";
import Hero from "./(components)/Hero/Hero/Hero";
import { allRecipe } from "./lib/getRecipe";
import { useRecipeDataContext } from "./(context)/RecipeData";
import SectionTemplate1 from "./(components)/SectionTemplate/Template1";

export default function Home() {
  const {updateRecipeData} = useRecipeDataContext();
  useEffect(()=>{
    const getData = async () => {

      const data = await allRecipe()
      updateRecipeData(data)
      console.log("This is Recipe Data",data)

    }
    getData()
  },[updateRecipeData])

  return (
    <div>
      <Hero/>
      <SectionTemplate1 sectionTitle="Featured Dishes" howMany={3}/>
    </div>
  );
}
