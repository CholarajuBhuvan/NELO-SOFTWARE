import React from 'react';

/**
 * TaskItem Component
 * Individual task card with actions
 * Displays task details and provides edit, delete, and toggle complete buttons
 */
function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  /**
   * Get priority badge styling
   */
  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800 border-red-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-green-100 text-green-800 border-green-300'
    };
    return styles[priority] || styles.medium;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  /**
   * Check if task is overdue
   */
  const isOverdue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return !task.completed && dueDate < today;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border-l-4 ${
      task.completed 
        ? 'border-green-500 opacity-75' 
        : isOverdue() 
        ? 'border-red-500' 
        : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title and Priority */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <p className={`text-gray-600 mb-3 ${task.completed ? 'line-through' : ''}`}>
            {task.description}
          </p>

          {/* Due Date and Status */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={isOverdue() && !task.completed ? 'text-red-600 font-medium' : 'text-gray-500'}>
                {formatDate(task.dueDate)}
                {isOverdue() && !task.completed && ' (Overdue)'}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-gray-500">
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-4">
          {/* Toggle Complete */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-2 rounded-lg transition duration-200 ${
              task.completed
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            title={task.completed ? 'Mark as pending' : 'Mark as complete'}
          >
            {task.completed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-200"
            title="Delete task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
