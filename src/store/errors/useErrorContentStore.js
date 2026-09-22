import { create } from "zustand";

import { notFoundData } from "@/data/errors/not-found.data";

/** Serves copy for the error screens, the same way auth content is served. */
export const useErrorContentStore = create((set) => ({
  notFound: notFoundData,

  setNotFound: (notFound) => set({ notFound }),
}));
