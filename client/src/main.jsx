import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie';
import { TaskDataProvider } from './TaskDataContext.jsx';
import { AddTaskCardProvider } from './AddTaskContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TaskDataProvider>
    <AddTaskCardProvider>
      <React.StrictMode>

        <App />

      </React.StrictMode>
    </AddTaskCardProvider>
  </TaskDataProvider>
)
