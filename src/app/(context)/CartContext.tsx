"use client"

import { createContext, useContext, useReducer } from "react"; 
import { RecipeData } from "../lib/getRecipe";

export interface Cart {
  menu:RecipeData
  amount:number
  price:number
}

interface CartState {
  cart:Cart[];
  totalPrice:number;
}

type CartAction = 
| { type:"addCart"; recipeInfo:Cart}
| { type: "removeItem"; recipeId: string };

const initialState:CartState= {
  cart:[],
  totalPrice:0
}

const reducer = (state: CartState, action: CartAction): CartState => {
  switch(action.type){
    case 'addCart':
      const existingItemIndex = state.cart.findIndex(
        (item) => item.menu.recipeId === action.recipeInfo.menu.recipeId
      );

      let newCart: Cart[];

      if(existingItemIndex === -1){
        newCart=[...state.cart,action.recipeInfo];
      } else {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].amount = action.recipeInfo.amount;
        updatedCart[existingItemIndex].price = updatedCart[existingItemIndex].amount * updatedCart[existingItemIndex].menu.recipePrice;
        newCart=updatedCart
      }

      const totalPrice = newCart.reduce((total, item)=>{return total+item.price},0)

      return {cart:newCart,totalPrice:totalPrice};
  
      case "removeItem": {
        const newCart = state.cart.filter(
          (item) => item.menu.recipeId !== action.recipeId
        );
        const totalPrice = newCart.reduce((total, item) => total + item.price, 0);
        return { cart: newCart, totalPrice: totalPrice };
      }
      
    default:
     return state;
  }
};

const CartDataContext = createContext<{state: CartState; dispatch: React.Dispatch<CartAction>} | undefined
>(undefined);

const CartDataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [state,dispatch] = useReducer(reducer,initialState);

  const value = {state, dispatch}

  return (
    <CartDataContext.Provider value={value}>
      {children}
    </CartDataContext.Provider>
  )
}

const useCartDataContext = () => {
  const context = useContext(CartDataContext);
  if(!context){
    throw new Error("useCartContex must be used within a CounterContextProvider");
  }
  return context;
}

export {CartDataContextProvider, useCartDataContext}
