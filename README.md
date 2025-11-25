# Task Manager Application

A modern, feature-rich Task Manager built with React and Tailwind CSS. This application provides comprehensive task management capabilities with authentication, filtering, search, and automated notifications.

## 🚀 Features

### 1. **CRUD Operations**
- ✅ Create tasks with Title, Description, Priority (High/Medium/Low), and Due Date
- ✅ Read/Display tasks with all details including status badges
- ✅ Update tasks inline with edit functionality
- ✅ Delete tasks with confirmation dialog
- ✅ Toggle task completion status
- ✅ Form validation for required fields
- ✅ Auto-clear form after submission

### 2. **Filtering & Search**
- ✅ Filter by: All, Completed, Pending, Priority (High/Medium/Low)
- ✅ Case-insensitive search with debouncing (300ms delay)
- ✅ Search across title and description
- ✅ Real-time task count badges for each filter
- ✅ Partial substring matching (Elastic Search style)

### 3. **Login Screen**
- ✅ Simple email/password authentication
- ✅ Email validation
- ✅ Session storage for persistent login
- ✅ Redirect to Task Dashboard after login
- ✅ Logout functionality

### 4. **Debouncing Search**
- ✅ Custom `useDebounce` hook
- ✅ 300ms debounce delay to prevent excessive re-renders
- ✅ Optimized performance during typing

### 5. **Elastic Search Flow**
- ✅ Input → Debounce → Filter → Render workflow
- ✅ Case-insensitive comparison
- ✅ Partial substring matching on title and description
- ✅ Real-time results update

### 6. **Session Management**
- ✅ `sessionStorage` for login persistence
- ✅ Task data persisted in session storage
- ✅ Session cleared on logout
- ✅ Auto-login on page refresh if session exists

### 7. **Task Mail Automation**
- ✅ Simulated cron job every 20 minutes
- ✅ Checks for pending, overdue, and upcoming tasks
- ✅ Console logs detailed notification emails
- ✅ Priority breakdown and task summaries
- ✅ Automatic trigger after login

## 🛠️ Technical Stack

- **React** - Frontend framework with hooks
- **Tailwind CSS** - Utility-first styling
- **Session Storage** - Client-side data persistence
- **Custom Hooks** - `useDebounce` for optimized search

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Login
1. Enter any valid email address
2. Enter any password
3. Click "Sign In"

### Creating Tasks
1. Fill in the task form on the left sidebar:
   - Title (required)
   - Description (required)
   - Priority (High/Medium/Low)
   - Due Date (required)
2. Click "Add Task"

### Managing Tasks
- **Mark Complete**: Click the green checkmark button
- **Edit**: Click the blue edit button (form will populate with task data)
- **Delete**: Click the red trash button (confirmation required)
- **Mark Pending**: Click the yellow undo button on completed tasks

### Filtering Tasks
Click any filter button to view:
- All Tasks
- Pending Tasks
- Completed Tasks
- High/Medium/Low Priority Tasks

### Searching Tasks
1. Type in the search bar
2. Search is debounced (waits 300ms after you stop typing)
3. Results update automatically
4. Searches both title and description
5. Case-insensitive and partial matching

### Mail Notifications
- Check the browser console every 20 minutes
- Notifications run automatically after login
- Shows pending, overdue, and upcoming tasks
- Priority breakdown included

## 📁 Project Structure

```
task-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.js              # Login form component
│   │   ├── TaskDashboard.js      # Main dashboard container
│   │   ├── TaskForm.js           # Add/Edit task form
│   │   ├── TaskList.js           # Task list container
│   │   ├── TaskItem.js           # Individual task card
│   │   ├── TaskFilters.js        # Filter buttons
│   │   └── SearchBar.js          # Search input with debounce
│   ├── hooks/
│   │   └── useDebounce.js        # Custom debounce hook
│   ├── utils/
│   │   └── mailAutomation.js     # Email notification logic
│   ├── App.js                    # Main app component
│   ├── index.js                  # Entry point
│   └── index.css                 # Tailwind directives
├── package.json
└── README.md
```

## 🎨 Component Details

### Reusable Components
All components are designed with reusability in mind:
- **Props-based**: Accept data and callbacks via props
- **Single Responsibility**: Each component has one clear purpose
- **Proper Naming**: Clear, descriptive component and function names
- **Comments**: Comprehensive JSDoc-style comments

### State Management
- React hooks (`useState`, `useEffect`)
- Session storage for persistence
- Parent-child props for data flow

## 🔧 Code Quality

- ✅ Clean, readable code
- ✅ Comprehensive comments
- ✅ Proper naming conventions
- ✅ Component separation and reusability
- ✅ Error handling and validation
- ✅ Responsive design with Tailwind CSS

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### GitHub Deployment
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Task Manager application with all features"

# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin main
```

## 📝 Requirements Checklist

- ✅ **CRUD Operations**: Full create, read, update, delete functionality
- ✅ **Filtering**: All, Completed, Pending, Priority filters
- ✅ **Search**: Case-insensitive with debouncing
- ✅ **Login Screen**: Email/password with session storage
- ✅ **Debouncing**: Custom hook implementation
- ✅ **Elastic Search Flow**: Input → Debounce → Filter → Render
- ✅ **Session Management**: Persistent until tab closes
- ✅ **Mail Automation**: 20-minute interval notifications

## 🌟 Additional Features

- Overdue task detection and highlighting
- Task count badges on filter buttons
- Smooth transitions and hover effects
- Responsive design for all screen sizes
- Priority color coding
- Date formatting
- Empty state handling
- Loading states consideration

## 📱 Screenshots

The application features:
- Modern, clean UI with Tailwind CSS
- Color-coded priority badges
- Intuitive icons for actions
- Responsive layout
- Professional gradient backgrounds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using React and Tailwind CSS

---

**Note**: This is a demo application. In production, you would want to:
- Use a real backend API
- Implement proper JWT authentication
- Use a database for data persistence
- Add unit and integration tests
- Implement proper error boundaries
- Add accessibility features (ARIA labels)
- Use environment variables for configuration
