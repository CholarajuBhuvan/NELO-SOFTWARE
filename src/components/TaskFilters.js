import React from 'react';

/**
 * TaskFilters Component
 * Provides filter buttons for task list
 * Shows count badges for each filter
 */
function TaskFilters({ currentFilter, onFilterChange, taskCounts }) {
  const filters = [
    { id: 'all', label: 'All Tasks', count: taskCounts.all },
    { id: 'pending', label: 'Pending', count: taskCounts.pending },
    { id: 'completed', label: 'Completed', count: taskCounts.completed },
    { id: 'high', label: 'High Priority', count: taskCounts.high },
    { id: 'medium', label: 'Medium Priority', count: taskCounts.medium },
    { id: 'low', label: 'Low Priority', count: taskCounts.low }
  ];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by:</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center gap-2 ${
              currentFilter === filter.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              currentFilter === filter.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilters;
