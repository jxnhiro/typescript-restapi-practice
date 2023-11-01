import { Request, Response, NextFunction, Router } from "express";

import { Todo } from "../models/todo";

const router = Router();

let todos: Array<Todo> = [];

router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({
    todos: todos,
  });
});

router.post("/todo", (req: Request, res: Response, _next: NextFunction) => {
  const todo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(todo);

  res.status(200).json({
    message: "Successfully added Todo!",
    text: todo.text,
  });
});

router.put(
  "/todo/:todoId",
  (req: Request, res: Response, _next: NextFunction) => {
    const todoId: string = req.params.todoId;

    const todoIndex: number = todos.findIndex(
      (todoItem) => todoItem.id === todoId,
    );

    if (todoIndex >= 0) {
      todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };

      res.status(200).json({ todos: todos });
    }

    res.status(404).json({
      message: "Could not find todo for this id.",
    });
  },
);

router.delete(
  "/todo/:todoId",
  (req: Request, res: Response, _next: NextFunction) => {
    const todoId: string = req.params.todoId;

    todos = todos.filter((todo) => todo.id !== todoId);

    if (!todos) {
      res.status(404).json({
        message: "Could not delete the todo for this id.",
      });
    }

    res.status(200).json({
      message: "Succeeded in deleting the todo for this id",
      todos: todos,
    });
  },
);

export default router;
