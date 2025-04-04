import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import client from "@/app/lib/contentful";

export interface EventData {
  eventTitle: string;
  eventImage: string;
  eventDescription: RichTextDocument["content"];
  eventDate: string;
  buttonText: string;
}

const getEvent = async () => {
  try{
    const entries = await client.getEntries({content_type: "eventInfo"})
    return entries.items;
  } catch(error){
    console.log('error fetching entries:', error)
  }
}
  
export const allEvent = async () :Promise<EventData[]> => {
  const data:EventData[] = []
  const entries:Entry<EntrySkeletonType>[]|undefined = await getEvent();
  if(entries){
    entries.map((item)=>{
      const cmsImage = item.fields.eventImg as Asset
      const cmsDescription = item.fields.eventDescription as RichTextDocument

      data.push({
        eventTitle: item.fields.eventTitle as string,
        eventImage:`https:${cmsImage.fields.file?.url}` as string,
        eventDescription:cmsDescription.content as RichTextDocument["content"],
        eventDate:item.fields.eventDate as string,
        buttonText:item.fields.buttonText as string,      
      })
    })

  }
  return data as EventData[]
}
  