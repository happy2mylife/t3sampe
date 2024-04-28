import create from "zustand";

import { UpdateTaskInput } from "../schema/todo";

type State = {
  editedTask: UpdateTaskInput;
  // stateの更新をするメソッド
  updateEditedTask: (payload: UpdateTaskInput) => void;
  // stateをリセットするメソッド
  resetEditedTask: () => void;
};

const useStore = create<State>((set) => ({
  editedTask: { taskId: "", title: "", body: "" },
  updateEditedTask: (payload) => {
    set({
      editedTask: payload,
    });
  },
  resetEditedTask: () => {
    set({ editedTask: { taskId: "", title: "", body: "" } });
  },
}));

export default useStore;
