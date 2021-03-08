import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WorkoutAlert } from './views';

const insertionPoint = document.createElement('div');
insertionPoint.id = 'insertion-point';
document.body.parentNode.insertBefore(insertionPoint, document.body);

const popupRoot = document.querySelector('#popup-root');

// popupRoot
//   ? ReactDOM.render(
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>,
//       popupRoot
//     )
//   : ReactDOM.render(
//       <React.StrictMode>
//         <WorkoutAlert />
//       </React.StrictMode>,
//       insertionPoint
//     );

// Building locally

// Workout Reminder

// ReactDOM.render(
//   <React.StrictMode>
//     <WorkoutAlert />
//   </React.StrictMode>,
//   insertionPoint
// );

// Popup

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  insertionPoint
);
