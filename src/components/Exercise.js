/* global chrome */
import React, { useState } from 'react';
import styled from 'styled-components';
import { localEnv } from '../constants';

const defaultSchedule = {
  m: false,
  t: false,
  w: false,
  th: false,
  f: false,
};

const Exercise = ({ name, id }) => {
  const [showExercise, setShowExercise] = useState(false);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [perDay, setPerDay] = useState('0');
  const days = Object.keys(schedule);

  const handleDayClick = (e) => {
    const key = e.target.name;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [key]: !prevSchedule[key],
    }));
  };

  const handlePerDayChange = (e) => {
    setPerDay(e.target.value);
  };

  const handleExerciseDisplay = (e) => {
    setShowExercise((showExercise) => !showExercise);
  };

  return (
    <ExerciseContainer>
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>{name}</p>
          {showExercise ? (
            <i
              className='card-header-icon fas fa-chevron-up'
              onClick={handleExerciseDisplay}
            ></i>
          ) : (
            <i
              className='card-header-icon fas fa-chevron-down'
              onClick={handleExerciseDisplay}
            ></i>
          )}
        </header>
      </div>
      {showExercise && (
        <div className='card-content'>
          <label className='label'>Schedule</label>
          <Schedule>
            {days.map((day) => {
              const label = `${day.slice(0, 1).toUpperCase()}${day.slice(1)}`;
              const classNames = ['button'];
              if (schedule[day]) classNames.push('is-info');
              return (
                <button
                  name={day}
                  className={classNames.join(' ')}
                  onClick={handleDayClick}
                  key={`${id}${day}`}
                >
                  {label}
                </button>
              );
            })}
          </Schedule>
          <label className='label'>Per Day ({perDay})</label>
          <input
            value={perDay}
            type='range'
            min='0'
            max='300'
            placeholder='# Per Day'
            onChange={handlePerDayChange}
          />
        </div>
      )}
    </ExerciseContainer>
  );
};

const Schedule = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    min-width: 50px;
  }
`;

const ExerciseContainer = styled.div`
  margin-bottom: 8px;
`;

export default Exercise;
export { Exercise };
