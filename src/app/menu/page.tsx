"use client"
import { useEffect, useState } from "react";
import { allRecipe, RecipeData } from "../lib/getRecipe";
import SectionTemplate1 from "../(components)/SectionTemplate/Template1";
import { useSession } from "next-auth/react";

export default function Home() {
  const [recipeData,setRecipeData] = useState<RecipeData[]>([])
  const { data: session } = useSession()

  useEffect(()=>{
    const getData = async () => {
      const data = await allRecipe()
      setRecipeData(data)
    }
    getData()
  },[setRecipeData])

  return (
    <div>
      <h2 className="text-2xl font-bold pt-[2rem] pl-[2rem]">Wellcome, {JSON.stringify(session?.user.username)}</h2>
      <SectionTemplate1 sectionTitle="Menu" recipeData={recipeData} cardType="menuCard"/>
    </div>
  );
}
