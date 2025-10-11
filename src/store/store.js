import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const userStore = (set) => ({
  user: {},
  solvedQ: [],
  userData: (data) => {
    set((state) => ({
      ...state,
      user: data,
    }));
  },
  addQuestions: (data) => {
    set((state) => {
      // make sure solvedQ is always an array and no nulls inside
      const safeSolvedQ = (state.solvedQ || []).filter(Boolean);

      const isAlreadySolved = safeSolvedQ.some((ele) => ele?.id === data.id);

      return {
        ...state,
        solvedQ: isAlreadySolved
          ? safeSolvedQ.filter((q) => q.id !== data.id)
          : [...safeSolvedQ, { id: data.id, sheet: data.sheet }],
      };
    });
  },
  removeUser: () => {
    set((state) => ({
      ...state,
      user: null,
    }));
  },
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
      partialize: (state) => ({ solvedQ: state.solvedQ, user: state.user }), // for partialize means if want only some things to store
    })
  )
);

export default useUserStore;
