import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export const useBearStore = create(persist((set, get) => ({

  accessToken: '',
  setAccessToken: (accessToken) => set({ accessToken, }),
  tokenType: '',
  setTokenType: (tokenType) => set({ tokenType, }),
  user: null,
  setUser: (user) => set({ user, }),
  handleClearStore: () => {
    set({ accessToken: '', tokenType: '', user: null, })
    localStorage.clear()
  },
}),
{
  name: 'github-storage',
  getStorage: () => createJSONStorage(() => localStorage),
}))

