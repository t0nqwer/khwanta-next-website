import { create } from "zustand";

const useModalState = create((set) => ({
  question: "fgsdfgfgsfgdkld;",
  id: "",
  answer: false,
  show: false,
  setQuestion: (value) => set((state) => ({ ...state, question: value })),
  setAnswer: (value) => {
    console.log(value);
    set((state) => ({ ...state, answer: value }));
  },
  setShow: (value) => set((state) => ({ ...state, show: value })),
  setId: (value) => set((state) => ({ ...state, id: value })),
  modalReset: () => set((state) => ({ ...state, question: "", answer: false, show: false, id: "" })),
}));

export default useModalState;
