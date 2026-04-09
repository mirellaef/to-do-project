import type { Request, Response } from "express";
import * as taskService from "../services/task.service";

export async function listTasks(_req: Request, res: Response) {
  const tasks = await taskService.listTasks();
  res.json(tasks);
}

export async function getTaskById(req: Request, res: Response) {
  const task = await taskService.getTaskById(req.params.id);
  res.json(task);
}

export async function createTask(req: Request, res: Response) {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
}

export async function updateTask(req: Request, res: Response) {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
}

export async function deleteTask(req: Request, res: Response) {
  await taskService.deleteTask(req.params.id);
  res.status(204).send();
}
