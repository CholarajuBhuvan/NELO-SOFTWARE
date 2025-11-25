import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import SearchBar from './SearchBar';
import { useDebounce } from '../hooks/useDebounce';

/**
 * TaskDashboard Component
 * Main dashboard for task management
 * Handles all CRUD operations, filtering, and search
 */
function TaskDashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  
  // Debounce search term for elastic search flow
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Load tasks from session storage on mount
  useEffect(() => {
    const storedTasks = sessionStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to session storage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || sessionStorage.getItem('tasks')) {
      sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  /**
   * Add a new task
   * @param {Object} task - Task object with title, description, priority, dueDate
   */
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };

  /**
   * Update an existing task
   * @param {number} id - Task ID
   * @param {Object} updatedTask - Updated task data
   */
  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
    setEditingTask(null);
  };

  /**
   * Delete a task with confirmation
   * @param {number} id - Task ID
   */
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  /**
   * Toggle task completion status
   * @param {number} id - Task ID
   */
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  /**
   * Filter and search tasks
   * Implements elastic search-style workflow with debouncing
   */
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply completion filter
    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'high' || filter === 'medium' || filter === 'low') {
      filtered = filtered.filter(task => task.priority === filter);
    }

    // Apply search with case-insensitive partial substring matching
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  // Get user email from session
  const userSession = JSON.parse(sessionStorage.getItem('userSession') || '{}');
  const userEmail = userSession.email || 'User';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome, {userEmail}</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <TaskForm
                onSubmit={editingTask ? (task) => updateTask(editingTask.id, task) : addTask}
                initialTask={editingTask}
                onCancel={() => setEditingTask(null)}
              />
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <TaskFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                taskCounts={{
                  all: tasks.length,
                  completed: tasks.filter(t => t.completed).length,
                  pending: tasks.filter(t => !t.completed).length,
                  high: tasks.filter(t => t.priority === 'high').length,
                  medium: tasks.filter(t => t.priority === 'medium').length,
                  low: tasks.filter(t => t.priority === 'low').length
                }}
              />
            </div>

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onEdit={setEditingTask}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskDashboard;
