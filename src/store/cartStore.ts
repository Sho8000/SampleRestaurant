import { RecipeData } from '@/app/lib/getRecipe'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Cart {
  menu: RecipeData
  amount: number
  price: number
}

interface CartState {
  email: string
  cart: Cart[]
  totalItems: number
  totalPrice: number
  setEmail: (email: string) => void
  addCart: (recipeInfo: Cart) => void
  removeItem: (recipeId: string) => void
  deleteCartItems: ()=> void
}



export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      email: "",
      cart: [],
      totalItems: 0,
      totalPrice: 0,

      setEmail: (email) => {
        const prevEmail = get().email;
        if (prevEmail && prevEmail !== email) {
          set({ cart: [], totalItems:0, totalPrice: 0 });
        }
        set({ email });
      },

      addCart: (recipeInfo) => {
        const existingIndex = get().cart.findIndex(
          (item) => item.menu.recipeId === recipeInfo.menu.recipeId
        )

        let newCart: Cart[]

        if (existingIndex === -1) {
          newCart = [...get().cart, recipeInfo]
        } else {
          newCart = [...get().cart]
          newCart[existingIndex].amount = recipeInfo.amount
          newCart[existingIndex].price =
            recipeInfo.amount * recipeInfo.menu.recipePrice
        }

        const totalPrice = newCart.reduce((sum, item) => sum + item.price, 0)
        const totalItems = newCart.reduce((sum,item) => sum + item.amount, 0)

        set({ cart: newCart, totalPrice, totalItems })
      },

      removeItem: (recipeId) => {
        const newCart = get().cart.filter(
          (item) => item.menu.recipeId !== recipeId
        )
        const totalPrice = newCart.reduce((sum, item) => sum + item.price, 0)
        const totalItems = newCart.reduce((sum,item) => sum + item.amount, 0)
        set({ cart: newCart, totalPrice,totalItems })
      },

      deleteCartItems: () => {
        set({ cart: [], totalPrice:0, totalItems:0 })
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
)
