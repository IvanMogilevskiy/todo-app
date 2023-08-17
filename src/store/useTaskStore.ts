import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '../utils/utils.ts';

interface Task {
  id: string;
  title: string;
  createdAt: number;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  removeCompleted: () => void;
}

export const useTaskStore = create<TaskStore>()((persist((set, get) => ({
  tasks: [],
  addTask: (title) => {
    const {tasks} = get();
    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
      completed: false,
    }

    set({
      tasks: [...tasks, newTask],
    })
  },
  updateTask: (id: string, title: string) => {
    const {tasks} = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      }))
    });
  },
  removeTask: (id: string) => {
    const {tasks} = get();
    set({
      tasks: tasks.filter((task) => task.id !== id)
    });
  },
  completeTask: (id: string) => {
    const {tasks} = get();
    set({
      tasks: tasks.map(
        (task) => task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    });
  },
  removeCompleted: () => {
    const {tasks} = get();
    set({
      tasks: tasks.filter((task) => !task.completed)
    });
  },
}), {
  name: 'tasks',
})));