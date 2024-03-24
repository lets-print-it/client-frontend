import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      getAccessToken: () => get().accessToken,
    }),
    {
      name: "user-auth",
    },
  ),
);
