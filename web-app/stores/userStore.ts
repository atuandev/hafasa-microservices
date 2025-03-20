import { create } from 'zustand'
import { User } from '@/types/user'

type UserStoreType = {
  user: User | null
  setUser: (user: User) => void
}

export const userStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))