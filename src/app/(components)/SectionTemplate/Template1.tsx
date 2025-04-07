import MenuCard from "../Cards/MenuCard";
import Button from "../Button/Button";
import { RecipeData } from "@/app/lib/getRecipe";
import { EventData } from "@/app/lib/getEvent";
import EventCard from "../Cards/EventCard";
import { useEffect, useRef, useState } from "react";

interface SectionTemplate1Props {
  sectionTitle:string
  howMany?:number;
  recipeData?:RecipeData[]
  eventData?:EventData[]
  btn?:boolean;
  detail?:boolean;
  cardType:"menuCard"|"eventCard";
}

export default function SectionTemplate1 ({sectionTitle,howMany,recipeData,btn,cardType,eventData,detail=false}:SectionTemplate1Props) {

  const recipeLength = howMany || recipeData?.length;
  const eventLength = howMany || eventData?.length;
  const selectRef = useRef<HTMLDivElement|null>(null);
  const [categories,setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("0");

  useEffect(() => {
    if (recipeData) {
      const uniqueCategories = [...new Set(recipeData.map((recipe) => recipe.recipeCategory))];
      setCategories(uniqueCategories);
    }
  }, [recipeData]);

  useEffect(() => {
    if (selectRef.current) {
      if (detail) {
        selectRef.current.style.display = "block";
      } else {
        selectRef.current.style.display = "none";
      }
    }
  }, [detail]);

  const filteredRecipes = recipeData?.filter((recipe) => 
    selectedCategory === "0" ? true : recipe.recipeCategory === selectedCategory
  );

  const chooseCard = () => {
    switch (cardType) {
      case "menuCard":
        return <MenuCard recipeData={filteredRecipes!.slice(0,recipeLength)} detail={detail}/>
    
      case "eventCard":
        return <EventCard eventData={eventData!.slice(0,eventLength)}/>        
    }
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  
  return (
    <section className="w-[90%] my-[2rem] m-auto">
      <h2 className="text-4xl font-bold text-center pb-[1rem]">{sectionTitle}</h2>

      <div ref={selectRef} className="w-fit m-auto mb-[1rem] px-[1rem] py-[0.3rem] border-1 border-black rounded-md">
        <select name="filter" id="filter" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="0">All Menu</option>
          {categories.map((item,index)=>
            <option key={index} value={`${item}`}>{item}</option>
          )}
        </select>
      </div>

      <div className="flex gap-x-2 gap-y-[1rem] flex-wrap justify-around">
        {chooseCard()}
        
      </div>
      <div className="w-[90%] flex justify-end mt-[2rem]">

      {btn?(
        <Button text={"See All Menu"}/>
      ):(<></>)}

      </div>
    </section>
  );
}



