import React, { useCallback, useState } from 'react';
import styles from './inputAdd.module.scss';

interface InputAddProps {
  onAdd: (title: string) => void;
}

const InputAdd: React.FC<InputAddProps> = ({ onAdd }) => {
  const [value, setValue] = useState('');
  const createTask = useCallback(() => {
    onAdd(value);
    setValue('');
  }, [value]);

  return (
    <div className={styles.inputAdd}>
      <input
        type="text"
        className={styles.inputAddTypeHere}
        value={value}
        placeholder="Add your task"
        onChange={(e) => {
          setValue(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            createTask();
          }
        }}
      />
      <button
        className={styles.inputAddButton}
        onClick={createTask}
        aria-label="Add"
      />
    </div>
  );
};

export default InputAdd;