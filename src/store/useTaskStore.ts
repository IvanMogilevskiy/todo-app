import create from 'zustand';
import { generateId } from '../utils/utils.ts';

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  addTask: (title) => {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    }

    set({
      tasks: [newTask].concat(tasks),
    })
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      }))
    });
  },
  removeTask: (id: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id)
    });
  },
}));