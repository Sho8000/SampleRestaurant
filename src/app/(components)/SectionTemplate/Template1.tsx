import MenuCard from "../Cards/MenuCard";
import Button from "../Button/Button";
import { RecipeData } from "@/app/lib/getRecipe";
import { EventData } from "@/app/lib/getEvent";
import EventCard from "../Cards/EventCard";

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

  const chooseCard = () => {
    switch (cardType) {
      case "menuCard":
        return <MenuCard recipeData={recipeData!.slice(0,recipeLength)} detail={detail}/>
    
      case "eventCard":
        return <EventCard eventData={eventData!.slice(0,eventLength)}/>        
    }
  }
  return (
    <section className="w-[90%] my-[2rem] m-auto">
      <h2 className="text-4xl font-bold text-center pb-[2rem]">{sectionTitle}</h2>
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



