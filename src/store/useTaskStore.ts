import { create, State, StateCreator } from 'zustand';
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

function isTaskStore(object: any): object is TaskStore {
  return 'tasks' in object;
}

const localStorage = <T extends State>(config: StateCreator<T>):
  StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
  if (isTaskStore(nextState)) {
    window.localStorage.setItem('tasks', JSON.stringify(
      nextState.tasks
    ));
  }
  set(nextState, ...args);
}, get, api);

const getCurrentState = () => {
  try {
    const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
    return currentState;
  } catch(err) {
    window.localStorage.setItem('tasks', '[]');
  }

  return [];
}

export const useTaskStore = create<TaskStore>(localStorage((set, get) => ({
  tasks: getCurrentState(),
  addTask: (title) => {
    const {tasks} = get();
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
})));