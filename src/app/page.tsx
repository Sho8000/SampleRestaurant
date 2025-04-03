"use client"
import { useEffect } from "react";
import Hero from "./(components)/Hero/Hero/Hero";
import { allRecipe } from "./api/RecipeInfo/route";

export default function Home() {
  useEffect(()=>{
    const getData = async () => {
      const data = await allRecipe()
      console.log("This is Recipe Data",data)
      
    }
    getData()
  },[])

  return (
    <div>
      <Hero/>
{/*       {documentToReactComponents(entries[0].fields.category)} */}
    </div>
  );
}
