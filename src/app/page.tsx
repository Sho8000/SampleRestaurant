//import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Hero from "./(components)/Hero/Hero/Hero";
//import client from "./lib/contentful";
//import { RecipeProps } from "./lib/contentfulInterface";
//import { Asset, Entry, EntrySkeletonType } from "contentful";

export default async function Home() {

/*   const fetchEntries = async () => {
    try{
      const entries = await client.getEntries({content_type: "recipes"})
      return entries.items;
    } catch(error){
      console.log('error fetching entries:', error)
    }
  }

  const entries:Entry<EntrySkeletonType, undefined, string>[]|undefined = await fetchEntries();

  
  if(entries){

    const cmsImage = entries[0].fields.recipeImg as Asset
    const cmsDescription = entries[0].fields.recipeDescription

    console.log("entries: ", entries);
    console.log("title: ", entries[0].fields.recipeName);
    console.log("Image: ", "https:"+cmsImage.fields.file?.url);
    console.log("Desc: ", entries[0].fields.recipeDescription?.content);
//    console.log("Desc: ", cmsDescription?.content);
    console.log("Price: ", entries[0].fields.price)
    console.log("Category: ", entries[0].fields.category)
    console.log("Ingredients: ", entries[0].fields.ingredients)    
  }
//  console.dir(entries, {depth:null})
 */
  return (
    <div>
      <Hero/>
{/*       {documentToReactComponents(entries[0].fields.category)} */}
    </div>
  );
}
