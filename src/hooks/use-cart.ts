import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item._id === data._id);

        if (existingItem) {
          return toast("Item already in cart.", {
            duration: 4000,
            position: "top-right",

            // Styling
            style: {},
            className: "",
            // Custom Icon
            icon: "ℹ️",

            // Change colors of success/error/loading icon
            iconTheme: {
              primary: "#000",
              secondary: "#fff",
            },
          });
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.", {
          duration: 4000,
          position: "top-right",

          // Styling
          style: {},
          className: "",

          // Custom Icon
          icon: "🛒",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item._id !== id)] });
        toast.success("Item removed from cart.", {
          duration: 4000,
          position: "top-right",

          // Styling
          style: {},
          className: "",
          // Custom Icon
          icon: "🛒",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
