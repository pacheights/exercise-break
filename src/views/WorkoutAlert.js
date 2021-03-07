import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShadowRoot } from '../ShadowRoot';

const WorkoutAlert = () => {
  const [visible, setVisible] = useState(false);
  const [interval] = useState(() => {
    return setInterval(() => {
      if (new Date().getSeconds() === 0) {
        if (document.visibilityState === 'hidden') return;
        if (visible) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
    }, 1000);
  });

  return (
    <ShadowRoot>
      <div>
        <style>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css'
          />
        </style>
        {true ? (
          <ReminderContainer>
            <p>Workout</p>
          </ReminderContainer>
        ) : (
          <></>
        )}
      </div>
    </ShadowRoot>
  );
};

const ReminderContainer = styled.div`
  font-family: 'Lato', 'BlinkMacSystemFont', '-apple-system', 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 30px;
  right: 12px;
  z-index: 2147483647;
  width: 300px;
  height: 115px;
  background-color: lightblue;
`;

export default WorkoutAlert;
export { WorkoutAlert };
