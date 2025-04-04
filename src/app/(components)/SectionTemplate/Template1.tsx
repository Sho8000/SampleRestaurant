import { RecipeData } from "@/app/page";
import MenuCard from "../Cards/MenuCard";
import Button from "../Button/Button";

interface SectionTemplate1Props {
  sectionTitle:string
  howMany?:number;
  recipeData:RecipeData[]
  btn?:boolean;
  cardType:"menuCard"|"eventCard"
}

export default function SectionTemplate1 ({sectionTitle,howMany,recipeData,btn,cardType}:SectionTemplate1Props) {
  const recipeLength = howMany || recipeData.length;

  const chooseCard = () => {
    switch (cardType) {
      case "menuCard":
        return <MenuCard recipeData={recipeData.slice(0,recipeLength)}/>
    
      case "eventCard":
        return <></>        
    }
  }
  return (
    <section className="w-[90%] my-[2rem] m-auto">
      <h2 className="text-4xl font-bold text-center py-[2rem]">{sectionTitle}</h2>
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



