import { RecipeData } from "@/app/page";
import MenuCard from "../Hero/Cards/MenuCard";

interface SectionTemplate1Props {
  sectionTitle:string
  howMany?:number;
  recipeData:RecipeData[]
}

export default function SectionTemplate1 ({sectionTitle,howMany,recipeData}:SectionTemplate1Props) {
  const recipeLength = howMany || recipeData.length;

  return (
    <section className="my-[2rem]">
      <h2 className="text-4xl font-bold text-center py-[2rem]">{sectionTitle}</h2>
      <div className="flex gap-x-2 gap-y-[1rem] flex-wrap justify-around">
        <MenuCard recipeData={recipeData.slice(0,recipeLength)}/>
      </div>
    </section>
  );
}



