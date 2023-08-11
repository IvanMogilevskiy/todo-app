import React from 'react';
import { useTaskStore } from '../../store/useTaskStore.ts';
import InputAdd from '../InputAdd/InputAdd.tsx';
import styles from './taskList.module.scss';
import Task from '../Task/Task.tsx';

const App: React.FC = () => {
  const [
    tasks,
    addTask,
    updateTask,
    removeTask,
  ] = useTaskStore(state => [
    state.tasks,
    state.addTask,
    state.updateTask,
    state.removeTask,
  ]);

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
            onComplete={removeTask}
            onEdited={updateTask}
            onRemove={removeTask}
          />
        ))}
      </section>
    </article>
  );
};

export default App;


// function App() {
//   return (
//     <>
//       <h1 className={'title'}>Tasks</h1>
//       <div className={'task_list'}>
//         <TaskList />
//       </div>
//     </>
//   )
// }