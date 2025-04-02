"use client"
import { motion } from "motion/react"
import Styles from "./TitleCard.module.css"

export default function TitleCard() {
  return (
    <motion.div 
      className={`flex flex-col gap-[1rem] justify-center items-center w-[80%] min-w-[700px] h-[300px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black/60 text-white text-center rounded-2xl ${Styles.cardComponent}`}
      initial={{opacity:0}}
      animate={{opacity:1, transition:{delay:1.5}}}
    >
      <h1 className="font-bold text-4xl">NextJS Sample Restaurant</h1>
      <p>Discover a unique culinary experience with our fusion of traditional and modern flavors</p>
      <motion.button 
        className="border-2 border-white w-fit px-[1rem] py-[5px] rounded-md"
        whileHover={{translateY:"-3px",cursor:"pointer"}}
      >View Menu</motion.button>
    </motion.div>
  );
}



