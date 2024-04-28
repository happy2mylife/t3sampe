import { router } from "../trpc";
import { todoRouter } from "./todo";

export const appRouter = router({
  // todoRouterを登録
  // ここでつけた名前がfrontendで指定するtRPCの名前
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
