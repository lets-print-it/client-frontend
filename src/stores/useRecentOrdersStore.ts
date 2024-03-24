import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentOrdersState {
  ordersId: string[];
  addOrder: (id: string) => void;
  removeOrder: (id: string) => void;
  clear: () => void;
}

export const useRecentOrdersStore = create<RecentOrdersState>()(
  persist(
    (set, get) => ({
      ordersId: [],
      addOrder: (id) => set({ ordersId: [id, ...get().ordersId] }),
      removeOrder: (id) =>
        set({ ordersId: get().ordersId.filter((orderId) => orderId !== id) }),
      clear: () => set({ ordersId: [] }),
    }),
    {
      name: "recent-orders",
    },
  ),
);
