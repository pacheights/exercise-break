import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DAYS } from '../util/constants';
import { getIsActiveExercise } from '../util/methods';

const Exercise = ({
  name,
  id,
  schedule,
  perSet,
  handleUpdate,
  custom,
  deleteExercise,
  newExercise,
}) => {
  const [showExercise, setShowExercise] = useState(false);
  const handleDayClick = (e) => {
    const day = e.target.name;
    handleUpdate('schedule', {
      ...schedule,
      [day]: !schedule[day],
    });
  };

  const handlePerSetChange = (e) => {
    handleUpdate('perSet', parseInt(e.target.value));
  };

  const handleDeleteExercise = () => {
    deleteExercise(id);
  };

  const handleExerciseDisplay = () => {
    setShowExercise(!showExercise);
  };

  useEffect(() => {
    const isActiveExercise = getIsActiveExercise(perSet, schedule);
    const show = isActiveExercise || newExercise || showExercise;
    setShowExercise(show);
  }, [perSet, schedule]);

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
          {/* <label className='label'>Schedule</label> */}
          <Schedule>
            {DAYS.map((day) => {
              const label = `${day.slice(0, 1).toUpperCase()}${day.slice(1)}`;
              const classNames = ['button'];
              if (schedule[day]) classNames.push('is-info');
              return (
                <button
                  name={day}
                  className={classNames.join(' ')}
                  onClick={handleDayClick}
                  key={day}
                >
                  {label}
                </button>
              );
            })}
          </Schedule>
          <label className='label'>Per Set ({perSet})</label>
          <input
            value={perSet}
            onChange={handlePerSetChange}
            type='range'
            min='0'
            max='120'
          />
          {custom && (
            <DeleteContainer>
              <DeleteTextButton onClick={handleDeleteExercise}>
                Delete Exercise
              </DeleteTextButton>
            </DeleteContainer>
          )}
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
    min-width: 42px;
    max-width: 42px;
    height: 38px;
  }
`;

const ExerciseContainer = styled.div`
  margin-bottom: 8px;
`;

const DeleteContainer = styled.div`
  margin-top: 18px;
`;

const DeleteTextButton = styled.p`
  color: red;
  font-size: 14px;
  width: fit-content;
  &:hover {
    cursor: pointer;
    opacity: 0.65;
  }
`;

export default Exercise;
export { Exercise };
