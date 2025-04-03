import client from "@/app/lib/contentful";

export const getRecipe = async () => {
    try{
      const entries = await client.getEntries({content_type: "recipes"})
      return entries.items;
    } catch(error){
      console.log('error fetching entries:', error)
    }
  }
  