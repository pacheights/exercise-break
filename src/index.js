import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Alert } from './views';
import { localEnv } from './util/constants';

const insertionPoint = document.createElement('div');
insertionPoint.id = 'insertion-point';
document.body.parentNode.insertBefore(insertionPoint, document.body);

const popupRoot = document.querySelector('#popup-root');

if (localEnv) {
  // Building locally
  // Workout Reminder
  // ReactDOM.render(
  //   <React.StrictMode>
  //     <Alert />
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
} else {
  popupRoot
    ? ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        popupRoot
      )
    : ReactDOM.render(
        <React.StrictMode>
          <Alert />
        </React.StrictMode>,
        insertionPoint
      );
}
