import React from 'react';
import { useTaskStore } from '../../store/useTaskStore.ts';
import InputAdd from '../InputAdd/InputAdd.tsx';
import styles from './taskList.module.scss';
import Task from '../Task/Task.tsx';
import { useFilter } from '../../store/useFilter.ts';
import ControlPanel from '../ControlPanel/ControlPanel.tsx';

const App: React.FC = () => {
  const [
    addTask,
    updateTask,
    removeTask,
  ] = useTaskStore(state => [
    state.addTask,
    state.updateTask,
    state.removeTask,
    state.completeTask,
  ]);

  const filter = useFilter((state) => state.filter);
  const tasks = useTaskStore((state) => {
    switch (filter) {
      case 'completed':
        return state.tasks.filter((task) => task.completed);
      case 'uncompleted':
        return state.tasks.filter((task) => !task.completed);
      default:
        return state.tasks;
    }
  });

  return (
    <article className={styles.taskList}>
      <h1 className={styles.taskListTitle}>Task List</h1>
      <section className={styles.taskListSection}>
        <InputAdd
          onAdd={(title) => {
            if (title) {
              addTask(title)
            }
          }}
        />
      </section>
      <section className={styles.taskListSection}>
        {!tasks.length && (
          <p className={styles.taskListText}>There are no tasks yet</p>
        )}
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            onEdited={updateTask}
            onRemove={removeTask}
            completed={task.completed}
          />
        ))}
        <ControlPanel />
      </section>
    </article>
  );
};

export default App;