import React from 'react';
import DraggableTaskItem from './DraggableTaskItem';

function TaskList({ tasks, deleteTask, toggleTask, moveTask }) {
  return (
    <ul>
      {tasks.length === 0 ? (
        <li style={{ textAlign: 'center', color: '#888' }}>No tasks found</li>
      ) : (
        tasks.map((task, index) => (
          <DraggableTaskItem
            key={task.id}
            task={task}
            index={index}
            deleteTask={() => deleteTask(task.id)}
            toggleTask={() => toggleTask(task.id)}
            moveTask={moveTask}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;