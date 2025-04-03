"use client"
import { useEffect } from "react";
import Hero from "./(components)/Hero/Hero/Hero";
import { allRecipe } from "./lib/getRecipe";

export default function Home() {
  useEffect(()=>{
    const getData = async () => {

      const data = await allRecipe()
      console.log("This is Recipe Data",data)


//////////////////////////////////      
/*       const items:object[] = []
      const entries:Entry<EntrySkeletonType, undefined, string>[]|undefined = await getRecipe();
      if(entries){
        entries.map((item)=>{
          const cmsImage = item.fields.recipeImg as Asset
          const cmsDescription = item.fields.recipeDescription as RichTextDocument
  
          items.push({
            recipeName:item.fields.recipeName,
            recipeImage:"https"+cmsImage.fields.file?.url,
            recipeDescription:cmsDescription.content,
            recipePrice:item.fields.price,
            recipeCategory:item.fields.category,
            recipeIngredients:item.fields.ingredients,
          })
        })
      }
      console.log("This is Recipe Data",items) */
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
