import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import client from "@/app/lib/contentful";

export interface RecipeData {
  recipeName: string;
  recipeImage: string;
  recipeDescription: RichTextDocument["content"];
  recipePrice: number;
  recipeCategory: string;
  recipeIngredients: string;
}

const getRecipe = async () => {
  try{
    const entries = await client.getEntries({content_type: "recipes"})
    return entries.items;
  } catch(error){
    console.log('error fetching entries:', error)
  }
}
  
export const allRecipe = async () :Promise<RecipeData[]> => {
  const data:RecipeData[] = []
  const entries:Entry<EntrySkeletonType>[]|undefined = await getRecipe();
  if(entries){
    entries.map((item)=>{
      const cmsImage = item.fields.recipeImg as Asset
      const cmsDescription = item.fields.recipeDescription as RichTextDocument

      data.push({
        recipeName:item.fields.recipeName as string,
        recipeImage:`https:${cmsImage.fields.file?.url}` as string,
        recipeDescription:cmsDescription.content as RichTextDocument["content"],
        recipePrice:item.fields.price as number,
        recipeCategory:item.fields.category as string,
        recipeIngredients:item.fields.ingredients as string,
      })
    })
  }
  return data as RecipeData[]
}
  