import Styles from "./SVG.module.css"

interface closeProps {
  color?:string
}

export const CloseBtn = ({color="white"}:closeProps) => {
  return (
    <button className={`${Styles.closeBtn}`}>
      <svg width="50" height="50">
        <line x1="10" y1="10" x2="40" y2="40" stroke={color} strokeWidth="3px"/>
        <line x1="10" y1="40" x2="40" y2="10" stroke={color} strokeWidth="3px" />
      </svg>  
    </button>  
  )
}