import { create } from 'zustand'

type BookQuantityStoreType = {
  quantity: number
  setQuantity: (quantity: number) => void
  increment: () => void
  decrement: () => void
}

export const bookQuantityStore = create<BookQuantityStoreType>((set) => ({
  quantity: 1,
  setQuantity: (quantity) => set({ quantity }),
  increment: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrement: () => set((state) => ({ quantity: Math.max(1, state.quantity - 1) })),
}))