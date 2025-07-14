import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = useCallback((text, tag = 'General', dueDate = null) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    tag,
    dueDate,
  };
  setTasks([newTask, ...tasks]);
}, [tasks]);

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Move task for drag and drop
  const moveTask = (fromIndex, toIndex) => {
    const updated = [...tasks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setTasks(updated);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className='app-container'>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <button className='toggle-mode'
        onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: '1rem' }}
        title={darkMode? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {darkMode ? '☀️' : '🌙'}
        </button>

        <h1>📝 Tickr - ToDo App</h1>
        <Filter filter={filter} setFilter={setFilter} />
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          moveTask={moveTask}
        />
        <p>
          <strong>{tasks.filter(t => !t.completed).length}</strong> active tasks
        </p>
      </div>
    </div> 
  );
}

export default App;