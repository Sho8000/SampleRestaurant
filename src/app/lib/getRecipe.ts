import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import client from "./contentful";

export const getData = async () => {
    try{
      const entries = await client.getEntries({content_type: "recipes"})
      return entries.items;
    } catch(error){
      console.log('error fetching entries:', error)
    }
  }

export const allRecipe = async () => {
  const data:object[] = []
  const entries:Entry<EntrySkeletonType, undefined, string>[]|undefined = await getData();
  if(entries){
    entries.map((item)=>{
      const cmsImage = item.fields.recipeImg as Asset
      const cmsDescription = item.fields.recipeDescription as RichTextDocument

      data.push({
        recipeName:item.fields.recipeName,
        recipeImage:cmsImage.fields.file?.url,
        recipeDescription:cmsDescription.content,
        recipePrice:item.fields.price,
        recipeCategory:item.fields.category,
        recipeIngredients:item.fields.ingredients,
      })  
    })    
  }
  return data

}
  