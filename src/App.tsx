import React from 'react';
import './App.scss';
import {useTaskStore} from './store/useTaskStore.ts';

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
    <article className={'task_list'}>
      <h1 className={'title'}>Task List</h1>
      <section>
        <InputAdd />
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