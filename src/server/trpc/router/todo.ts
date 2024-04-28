import {
  createTaskSchema,
  getSingleTaskSchema,
  deleteSingleTaskSchema,
  updateTaskSchema,
} from "../../../schema/todo";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const todoRouter = router({
  // protectedProcedure: task新規作成は認証が通っている場合のみ適用するので使用
  // input: 適用したいValidationスキーマ
  // mutation: 新規作成なので。この中でdbに接続する処理をprismaで実装
  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      // prisma経由でDBにインサート
      return await ctx.prisma.task.create({
        // createで渡すデータ
        data: {
          // title, bodyはinputで受け取るのでスプレッドで展開
          ...input,
          // 今ログインしているユーザー情報
          user: {
            // connect: 既存の存在するレコードを関連づけたい場合に使用
            // ログインしているユーザーのIDに一致するユーザーのレコードを検索してくれ、そのオブジェクトをuserフィールドに格納してくれる
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  // publicProcedure: タスク取得ではGithub認証を不要とするので
  getTasks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        // ログインしているユーザーが作成したタスクのみ取得
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getSingleTask: protectedProcedure
    .input(getSingleTaskSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
    }),

  updateTask: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          title: input.title,
          body: input.body,
        },
      });
    }),
  deleteTask: protectedProcedure
    .input(deleteSingleTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),
});
