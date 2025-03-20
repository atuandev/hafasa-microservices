import { Book } from './book'

export type CartItem = {
  book: Book,
  quantity: number
}

export type Cart = {
  books: CartItem[]
}