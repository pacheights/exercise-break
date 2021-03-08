/* global chrome */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShadowRoot } from '../ShadowRoot';

const WorkoutAlert = () => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState();

  const getInterval = () =>
    setInterval(() => {
      if (new Date().getSeconds() === 0) {
        if (document.visibilityState === 'hidden') return;
        if (!visible) {
          setVisible(true);
        }
      }
    }, 1000);

  useEffect(() => {
    clearInterval(timer);
    setTimer(getInterval());
  }, [visible]);

  const handleOnClick = () => setVisible(false);

  return (
    <ShadowRoot>
      <div>
        <style>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css'
          />
        </style>
        {visible ? (
          <ReminderContainer>
            <Title className='subtitle'>Exercise Break</Title>
            <div className='card'>
              <header class='card-header'>
                <p class='card-header-title'>20 x Push Ups</p>
              </header>
            </div>
            <div className='card'>
              <header class='card-header'>
                <p class='card-header-title'>1 x Plank</p>
              </header>
            </div>
            <ButtonContainer className='buttons'>
              <button
                onClick={handleOnClick}
                className='button is-info is-light'
              >
                Submit
              </button>
              <button
                onClick={handleOnClick}
                className='button is-danger is-light'
              >
                Dismiss
              </button>
            </ButtonContainer>
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
  border-radius: 4px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 30px;
  right: 12px;
  z-index: 2147483647;
  width: 300px;
  padding: 16px;
  background-color: white;

  .card {
    margin-bottom: 8px;
  }
`;

const Title = styled.p`
  color: #363636 !important;
  font-weight: 600 !important;
`;

const ButtonContainer = styled.div`
  .button {
    height: 25px;
  }
  margin-top: 24px;
`;

export default WorkoutAlert;
export { WorkoutAlert };
