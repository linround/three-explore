import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export const useBearStore = create(persist((set, get) => ({
  bears: 0,
  addABear: () => set({ bears: get().bears + 1, }),
  accessToken: '',
  setAccessToken: (accessToken) => set({ accessToken, }),
  tokenType: '',
  setTokenType: (tokenType) => set({ tokenType, }),
  user: null,
  setUser: (user) => set({ user, }),
}),
{
  name: 'food-storage',
  getStorage: () => createJSONStorage(() => localStorage),
}))

