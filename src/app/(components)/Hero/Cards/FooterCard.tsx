import { ReactElement } from "react";
import Styles from "./Cards.module.css"

interface footerCardData {
  footerCardTitle:string;
  contents?:string[];
  icons?:ReactElement[];
  type:"Pattern1"|"Pattern2";
}

interface footerCardProps {
  footerData:footerCardData;
}

export default function FooterCard({footerData}:footerCardProps) {
  const {footerCardTitle, contents, type, icons} = footerData
  return (
    <div className="w-[300px] min-w-[300px] text-white px-[1rem]">
      <h3 className="font-bold mb-[1rem]">{footerCardTitle}</h3>

      
      {contents && type==="Pattern1"?(<div>
        {contents.map((item,index)=>
          <p key={index}>{item}</p>
        )}
      </div>):
      (<div className={`flex gap-[1rem] ${Styles.footerCardIcons}`}>
        {icons!.map((item,index)=>
          <div key={index}>{item}</div>
        )}
      </div>)}
    </div>
  );
}