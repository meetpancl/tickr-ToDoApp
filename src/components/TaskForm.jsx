import React, { useState, useEffect, useMemo } from 'react';
import { useOutsideClick } from 'react-use-outside-click';

const tags = ['General', 'Work', 'Personal', 'Urgent'];

function TaskForm({ addTask }) {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const commonTasks = useMemo(() => [
    "Finish report",
    "Call mom",
    "Buy groceries",
    "Prepare presentation",
    "Read a book",
    "Reply to email",
    "Workout",
    "Meditate",
    "Plan weekend trip",
    "Review goals"
  ], []);

  const ref = useOutsideClick(() => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (text.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = commonTasks.filter(task => task.toLowerCase().includes(text.toLowerCase()));

    setSuggestions(filtered);
  }, [text, commonTasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    addTask(text, tag, dueDate);
    setText('');
    setDueDate('');
    setSuggestions([]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setText('');
      if (e.key === 'Enter' && text.trim()) {
        e.preventDefault();
        addTask(text, tag, dueDate);
        setText('');
        setDueDate('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [text, addTask, tag, dueDate]);

  return (
    <div ref={ref} style={{position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setText(suggestion);
                    setSuggestions([]);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          {tags.map(t => <option key={t}>{t}</option>)}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TaskForm;