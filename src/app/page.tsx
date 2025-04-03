"use client"
import { useEffect } from "react";
import Hero from "./(components)/Hero/Hero/Hero";
import { getRecipe } from "./api/RecipeInfo/route";
import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export default function Home() {
  useEffect(()=>{
    const getData = async () => {
      const items:object[] = []
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
      console.log("This is Recipe Data",items)
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
