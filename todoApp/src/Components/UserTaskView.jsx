import React, { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskTable from './TaskTable';

const UserTaskView = () => {
  const { tasks } = useTasks();

  useEffect(() => {
    console.log('Tasks:', tasks); // Debug log to check tasks state
  }, [tasks]);

  return (
    <div>
      <h2>My Tasks</h2>
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default UserTaskView;




