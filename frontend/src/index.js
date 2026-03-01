import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';

/**
 * Application Entry Point
 * Wraps the App with WorkoutsContextProvider for global state management
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provide global state context for workouts */}
    <WorkoutsContextProvider>
      <App/>
    </WorkoutsContextProvider>
  </React.StrictMode>
);


