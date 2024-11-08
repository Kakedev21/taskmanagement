import { create } from "zustand";
import { User } from "../types/user";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setError: (error: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
  logout: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      error: null,
      isAuthenticated: false,
      loading: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setUser: (user: User) => set({ user }),
      setError: (error: string) => set({ error }),
      logout: () => set({ user: null, isAuthenticated: false, error: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
