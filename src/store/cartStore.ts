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
      totalPrice: 0,

      setEmail: (email) => {
        const prevEmail = get().email;
        if (prevEmail && prevEmail !== email) {
          set({ cart: [], totalPrice: 0 });
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

        set({ cart: newCart, totalPrice })
      },

      removeItem: (recipeId) => {
        const newCart = get().cart.filter(
          (item) => item.menu.recipeId !== recipeId
        )
        const totalPrice = newCart.reduce((sum, item) => sum + item.price, 0)
        set({ cart: newCart, totalPrice })
      },

      deleteCartItems: () => {
        set({ cart: [], totalPrice:0 })
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
)
