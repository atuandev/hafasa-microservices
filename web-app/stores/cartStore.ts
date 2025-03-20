import { create } from 'zustand'
import { Cart, CartItem } from '@/types/cart'

interface CartStore extends Cart {
  addItem: (item: CartItem) => void,
  removeItem: (id: string) => void,
  removeAll: () => void,
  increaseQuantity: (id: string, quantity?: number) => void,
  decreaseQuantity: (id: string) => void
}

const updateLocalStorage = (books: CartItem[]) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('cart', JSON.stringify(books))
  }
}

const getInitialCart = (): CartItem[] => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return JSON.parse(localStorage.getItem('cart')!) ?? []
  }
  return []
}

export const useCartStore = create<CartStore>()((set) => ({
  books: getInitialCart(),
  addItem: (item: CartItem) => {
    set((state) => {
      const existingItem = state.books.find(p => p.book.id === item.book.id)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.books.push(item)
      }
      updateLocalStorage(state.books)
      return { books: [...state.books] }
    })
  },
  removeItem: (id) => {
    set((state) => {
      const updatedCart = state.books.filter(item => item.book.id !== id)
      updateLocalStorage(updatedCart)
      return { books: updatedCart }
    })
  },
  removeAll: () => {
    updateLocalStorage([])
    return { books: [] }
  },
  increaseQuantity: (id, quantity = 1) => {
    set((state) => {
      const updatedCart = state.books.map(item => {
        if (item.book.id === id) {
          item.quantity += quantity
        }
        return item
      })
      updateLocalStorage(updatedCart)
      return { books: updatedCart }
    })
  },
  decreaseQuantity: (id) => {
    set((state) => {
      const updatedCart = state.books.filter(item => {
        if (item.book.id === id) {
          item.quantity = Math.max(1, item.quantity - 1)
        }
        return true
      })
      updateLocalStorage(updatedCart)
      return { books: updatedCart }
    })
  },
}))