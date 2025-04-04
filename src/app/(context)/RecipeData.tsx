"use client"

import { createContext, useContext, useState } from "react";
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface RecipeData {
  recipeName: string;
  recipeImage: string;
  recipeDescription: RichTextDocument["content"];
  recipePrice: number;
  recipeCategory: string;
  recipeIngredients: string;
}

type State = {
  recipeData: RecipeData[];
  updateRecipeData: (value:RecipeData[])=>void
}

const RecipeDataContext = createContext<State | undefined>(undefined); 

const RecipeDataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [recipeData,setRecipeData] = useState<RecipeData[]>([])

  const updateRecipeData = (value:RecipeData[]) => {
    setRecipeData(value);
  };

  const value = { recipeData,updateRecipeData};

  return (
    <RecipeDataContext.Provider value={value}>
      {children}
    </RecipeDataContext.Provider>
  )
}

const useRecipeDataContext = ():State => {
  const context = useContext(RecipeDataContext);
  if(!context){
    throw new Error("useRecipeDataContext must be used within a CounterContextProvider");
  }
  return context;
}

export { RecipeDataContextProvider, useRecipeDataContext };