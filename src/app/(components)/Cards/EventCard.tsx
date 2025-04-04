import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BLOCKS } from '@contentful/rich-text-types'
import { EventData } from "@/app/lib/getEvent";

interface eventProps {
  eventData:EventData[]
}

export default function EventCard({eventData}:eventProps) {

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
    return formattedDate;
  };

  return (
    <>
      {eventData.map((item,index)=><div key={index} className="w-[450px] border-1 border-black shadow-md rounded-md">
        <Image
          className="m-auto rounded-t-md"
          src={item.eventImage}
          alt={item.eventTitle}
          width={450}
          height={250}
          priority
          style={{width:"100%",height:"200px",objectFit:"cover"}}
        />
        <div className="mx-[1rem] mb-[1rem]">
          <h3 className="text-2xl font-bold mt-[1rem]">{item.eventTitle}</h3>
          <p className="text-sm text-gray-500 mb-[0.5rem]">{formatDate(item.eventDate)}</p>
          {documentToReactComponents({
            nodeType: BLOCKS.DOCUMENT,
            content: item.eventDescription,
            data: {}
          })}
        </div>
      </div>)}        
    </>
  );
}



