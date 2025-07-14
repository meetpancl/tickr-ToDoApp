import React from 'react';

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleTask}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#888' : '#333' }}>
          {task.text}
        </span>
      </div>
      <button className="delete-btn" onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default TaskItem;