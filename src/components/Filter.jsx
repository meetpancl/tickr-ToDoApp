import React from 'react';

function Filter({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}
      className={filter === 'all' ? 'active-filter' : ''} title="Show All Tasks">
        📋 All
      </button>
      <button onClick={() => setFilter('active')} disabled={filter === 'active'}
      className={filter === 'active' ? 'active-filter' : ''} title="Show Active Tasks">
        ⏱️ Active
      </button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}
      className={filter === 'completed' ? 'active-filter' : ''} title="Show Completed Tasks">
        ✔️ Completed
      </button>
    </div>
  );
}

export default Filter;