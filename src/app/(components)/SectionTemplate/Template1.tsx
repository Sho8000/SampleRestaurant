import { RecipeData } from "@/app/page";
import MenuCard from "../Hero/Cards/MenuCard";
import Button from "../Button/Button";

interface SectionTemplate1Props {
  sectionTitle:string
  howMany?:number;
  recipeData:RecipeData[]
  btn?:boolean;
}

export default function SectionTemplate1 ({sectionTitle,howMany,recipeData,btn}:SectionTemplate1Props) {
  const recipeLength = howMany || recipeData.length;

  return (
    <section className="w-[90%] my-[2rem] m-auto">
      <h2 className="text-4xl font-bold text-center py-[2rem]">{sectionTitle}</h2>
      <div className="flex gap-x-2 gap-y-[1rem] flex-wrap justify-around">
        <MenuCard recipeData={recipeData.slice(0,recipeLength)}/>
      </div>
      <div className="w-[90%] flex justify-end mt-[2rem]">

      {btn?(
        <Button text={"See All Menu"}/>
      ):(<></>)}

      </div>
    </section>
  );
}



