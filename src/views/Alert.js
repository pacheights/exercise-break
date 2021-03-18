/* global chrome */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShadowRoot } from '../ShadowRoot';
import moment from 'moment';
import {
  localEnv,
  DAYS,
  EXERCISE_MAP,
  closedTimeStampFormat,
} from '../util/constants';
import { getIsWeekday, getTodayIndex } from '../util/methods';

export const Alert = () => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState();
  const [workouts, setWorkouts] = useState([]);

  const handleOnClose = () => {
    if (localEnv) return;
    const closedTime = moment().format(closedTimeStampFormat);
    chrome.storage.local.set({ closedTime });
    setVisible(false);
  };

  const getInterval = () =>
    setInterval(() => {
      if (localEnv) return;
      const time = moment().format('HH:mm');
      const dayIdx = getTodayIndex();
      if (!getIsWeekday(dayIdx)) return;
      const day = DAYS[dayIdx];

      chrome.storage.local.get(
        ['workout', 'closedTime', 'customExercises'],
        (res) => {
          const workouts = res.workout;
          const { closedTime, customExercises } = res;
          const nowTimeStamp = moment().format(closedTimeStampFormat);
          if (closedTime === nowTimeStamp) {
            setVisible(false);
            return;
          }

          if (workouts[day] && workouts[day][time] && !visible) {
            const workout = workouts[day][time];
            const workoutKeys = Object.keys(workout);
            setWorkouts(
              workoutKeys.map((key) => {
                const label = EXERCISE_MAP[key] || customExercises[key];
                const perSet = workout[key];
                return [label, perSet];
              })
            );
            setVisible(true);
          }
        }
      );
    }, 2000);

  useEffect(() => {
    clearInterval(timer);
    setTimer(getInterval());
  }, [visible]);

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
            {workouts.map((workout) => {
              const [label, perSet] = workout;
              return (
                <div className='card' key={label}>
                  <header class='card-header'>
                    <p class='card-header-title'>
                      {perSet} x {label}
                    </p>
                  </header>
                </div>
              );
            })}
            <ButtonContainer className='buttons'>
              <button
                onClick={handleOnClose}
                className='button is-info is-light'
              >
                Close
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
  font-size: 15px;

  .card {
    margin-bottom: 8px;

    .card-header-title {
      padding: 10px 12px;
    }
  }
`;

const Title = styled.p`
  color: #363636 !important;
  font-weight: 600 !important;
  font-size: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  .button {
    height: 35px;
    font-size: 14px;
  }
  margin-top: 24px;
`;
