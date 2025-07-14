import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaBriefcase, FaUser, FaRegClock, FaExclamation } from 'react-icons/fa';

const ItemType = 'TASK';

function DraggableTaskItem({ task, index, moveTask, deleteTask, toggleTask }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li  ref={(node) => drag(drop(node))} style={{
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move'
    }} className={task.completed ? 'completed-animation' : ''}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleTask}
        />
        <span className={`task-tag ${task.tag}`}>
            {task.tag === 'Work' && <FaBriefcase />}
            {task.tag === 'Personal' && <FaUser />}
            {task.tag === 'General' && <FaRegClock />}
            {task.tag === 'Urgent' && <FaExclamation />}
            {task.tag}
            </span>
        <span style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#333'
        }}>
          {task.text}
        </span>
        {task.dueDate && <small style={{ marginLeft: '1rem', color: '#aaa' }}>
          Due: {task.dueDate}
        </small>}
      </div>
      <button className="delete-btn" onClick={deleteTask}>Delete</button>
    </li>
  );
}

export default DraggableTaskItem;