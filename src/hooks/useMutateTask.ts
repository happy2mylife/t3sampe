// tRPCサーバーで作った関数をクライアントから呼び出すためのカスタムhook

import useStore from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  // フロントエンドにReactQueryでキャッシュされているデータを手動で書き換える必要がある
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  // サーバーサイドで定義した関数をクライアントからtRPCで呼び出している
  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      // resはサーバーサイドからの戻り値
      const previousTodo = utils.todo.getTasks.getData();
      if (previousTodo) {
        // キャッシュにあればその先頭に追加
        utils.todo.getTasks.setData([res, ...previousTodo]);
      }
      // zustandの中のstate.resetEditedTaskを削除
      reset();
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      // resはサーバーサイドからの戻り値
      const previousTodo = utils.todo.getTasks.getData();
      if (previousTodo) {
        utils.todo.getTasks.setData(
          previousTodo.map((task) => (task.id === res.id ? res : task))
        );
      }
      // zustandの中のstate.resetEditedTaskを削除
      reset();
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    // _ deleteTaskの戻り値
    // variables: deletetaskに渡された引数＝削除対象のtaskId
    onSuccess: (_, variables) => {
      // resはサーバーサイドからの戻り値
      const previousTodo = utils.todo.getTasks.getData();
      if (previousTodo) {
        utils.todo.getTasks.setData(
          previousTodo.filter((task) => task.id !== variables.taskId)
        );
      }
      // zustandの中のstate.resetEditedTaskを削除
      reset();
    },
  });

  // Reactのコンポーネントで使えるようになる
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
