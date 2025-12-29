import { create } from "zustand";
import type { Book } from "../types/book-interface";

const useBookStore = create((set) => ({
  books: <Book[]>,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export default useBookStore;
