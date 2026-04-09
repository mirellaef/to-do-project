import { z } from "zod";

const taskStatusSchema = z.enum(["todo", "in-progress", "done"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "title é obrigatório"),
  description: z.string().optional().default(""),
  status: taskStatusSchema.optional().default("todo"),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: taskStatusSchema.optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.status !== undefined,
    { message: "Informe ao menos um campo: title, description ou status" }
  );

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
