import React, { useEffect, useRef, useState } from 'react';
import styles from './task.module.scss';

interface TaskProps {
  id: string;
  title: string;
  onComplete: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemove: (id: string) => void;
}


const Task: React.FC<TaskProps> = (
  {
    id,
    title,
    onComplete,
    onEdited,
    onRemove

  }) => {
  const [completed, setCompleted] = useState(false);
  const [isEdition, setIsEdition] = useState(false);
  const [value, setValue] = useState(title);
  const editionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdition) {
      editionInputRef?.current?.focus();
    }
  }, [isEdition]);

  return (
    <div className={styles.task}>
      <label className={styles.taskLabel}>
        <input
          className={styles.taskCheckbox}
          type="checkbox"
          checked={completed}
          disabled={isEdition}
          onChange={(e) => {
            setCompleted(e.target.checked);

            if (e.target.checked) {
              onComplete(id);
            }
          }}
        />
        {isEdition ? (
          <input
            className={styles.taskEditTitle}
            value={value}
            ref={editionInputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdited(id, value);
                setIsEdition(false);
              }
            }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : (
          <h3 className={styles.taskTitle}>{title}</h3>
        )}
      </label>
      {isEdition ? (
        <button
          className={styles.taskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEdition(false);
          }}
          aria-label="Save"
        />
      ) : (
        <button
          className={styles.taskEdit}
          onClick={() => {
            setIsEdition(true);
          }}
          aria-label="Edit"
        />
      )}
      <button
        className={styles.taskRemove}
        onClick={() => {
          if (confirm('Remove task?')) {
            onRemove(id);
          }
        }}
      />


    </div>
  );
};

export default Task;