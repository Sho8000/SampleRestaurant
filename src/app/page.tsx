"use client"
import { useEffect, useState } from "react";
import Hero from "./(components)/Hero/Hero";
import { allRecipe, RecipeData } from "./lib/getRecipe";
import SectionTemplate1 from "./(components)/SectionTemplate/Template1";
import { allEvent, EventData } from "./lib/getEvent";
//import { useSession } from "next-auth/react";

export default function Home() {
  const [recipeData,setRecipeData] = useState<RecipeData[]>([]);
  const [eventData,setEventData] = useState<EventData[]>([]);
//  const { data: session } = useSession()

  useEffect(()=>{
    const getRecipe = async () => {
      const data = await allRecipe()
      setRecipeData(data)
    }
    getRecipe()
  },[setRecipeData])
  
  useEffect(()=>{
    const getEvent = async () => {
      const data = await allEvent()
      setEventData(data)
    }
    getEvent()
  },[setEventData])

  return (
    <div>
      <Hero/>
      <SectionTemplate1 sectionTitle="Featured Dishes" howMany={3}  recipeData={recipeData} btn={true} cardType="menuCard"/>

      <SectionTemplate1 sectionTitle="Upcoming Events" howMany={2} eventData={eventData} cardType="eventCard"/>
    </div>
  );
}
