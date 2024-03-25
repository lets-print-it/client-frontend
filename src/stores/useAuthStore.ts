import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../models/printit";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string | null;
  getUser: () => User | null;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      getAccessToken: () => get().accessToken,
      logout: () => set({ accessToken: null }),
      getUser: () => {
        if (get().accessToken === null) {
          return null;
        }
        return null;
        // let token = get().accessToken;
        // let payload = token.split(".")[1];
        // let user = JSON.parse(atob(payload));
        // return user;
      },
    }),
    {
      name: "user-auth",
    },
  ),
);
