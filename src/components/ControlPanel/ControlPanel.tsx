import React from 'react';
import styles from './controlPanel.module.scss';
import { useTaskStore } from '../../store/useTaskStore.ts';
import { useFilter } from '../../store/useFilter.ts';

const ControlPanel: React.FC = () => {
  const { filter, setFilter } = useFilter();
  const leftCounter = useTaskStore((state) => {
    return state.tasks.filter((task) => !task.completed).length;
  });

  const removeCompleted = useTaskStore((state) => state.removeCompleted);

  return (
    <div className={styles.controlPanel}>
      <span>
        {leftCounter} unfinished left
      </span>
      <div className={styles.sortButtons}>
        <button
          className={(filter === 'all') ? styles.buttonAct : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={(filter === 'completed') ? styles.buttonAct : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={(filter === 'uncompleted') ? styles.buttonAct : ''}
          onClick={() => setFilter('uncompleted')}
        >
          Uncompleted
        </button>
      </div>
      <button
        hidden={!leftCounter} onClick={removeCompleted}
        className={styles.clearButton}
      >
        Clear completed
      </button>
    </div>
  );
};

export default ControlPanel;