import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { BLOCKS } from '@contentful/rich-text-types'
import { RecipeData } from "@/app/lib/getRecipe";
import { CloseBtn } from "../SVGs/Svg";
import Styles from "./Cards.module.css"

interface recipeProps {
  recipe:RecipeData
  onCloseButtonClick:(value:boolean)=>void
}

export default function DetailCard({recipe,onCloseButtonClick}:recipeProps) {

  const handleCloseBtnClick = () => {
    onCloseButtonClick(true);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/70 z-20">
        <div className={`relative top-[5%] left-[90%] ${Styles.closeBtn}`} onClick={handleCloseBtnClick}>
          <CloseBtn/>
        </div>
        <div className={`fixed w-[90vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 border-1 border-black shadow-md rounded-md  bg-[#fefefe] ${Styles.detailCardContainer}`}>
          <div className={`flex gap-[1rem] ${Styles.detailCard}`}>
            <div>
              <Image
                className={`h-[100%] object-cover m-auto rounded-l-md border-r-1 border-black ${Styles.detailCardImg}`}
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                width={290}
                height={290}
                priority
              />
            </div>
            <div className={`mx-[1rem] py-[1rem] ${Styles.detailTextContainer}`}>
              <h3 className={`text-2xl font-bold mt-[1rem] ${Styles.detailTitle}`}>{recipe.recipeName}</h3>
              <p className={`text-xl font-bold mb-[0.5rem] ${Styles.detailPlice}`}>${recipe.recipePrice}</p>
              <div className={`${Styles.detailContents}`}>
                {documentToReactComponents({
                    nodeType: BLOCKS.DOCUMENT,
                    content: recipe.recipeDescription,
                    data: {}
                  })}
              </div>
              <button className={`w-[50%] text-white bg-green-500 mt-[2rem] translate-x-[50%] px-[0.5rem] py-[0.5rem] border-1 border-black rounded-md ${Styles.addBtn}`}>Add Cart</button>
            </div>
          </div>
        </div>          
      </div>
    </>
  );
}