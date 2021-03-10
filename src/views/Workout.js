/* global chrome */
import React, { useState, useEffect } from 'react';
import { Exercise, TimeWindow } from '../components';
import styled from 'styled-components';
import { EXERCISE_MAP, localEnv, DEFAULT_SCHEDULE } from '../util/constants';
import { buildWorkoutSchedule } from '../util/methods';

const EXERCISES = Object.keys(EXERCISE_MAP);

const getDefaultExerciseSchedule = () => {
  const exerciseSchedules = {};
  for (const exercise of EXERCISES) {
    exerciseSchedules[exercise] = {
      showExercise: false,
      perSet: 0,
      schedule: { ...DEFAULT_SCHEDULE },
    };
  }
  return exerciseSchedules;
};

const Workout = () => {
  // if (!localEnv) {
  //   chrome.storage.onChanged.addListener(function (changes) {
  //     chrome.storage.local.get(null, (savedValues) => {
  //       // console.log(savedValues);
  //       buildWorkoutSchedule(savedValues);
  //     });
  //   });
  // }

  const [exerciseSchedules, setExerciseSchedules] = useState(() =>
    getDefaultExerciseSchedule()
  );
  const [numSets, setNumSets] = useState('0');
  const [start, setStart] = useState('09:00');
  const [minsBetweenSets, setMinsBetweenSets] = useState('0');

  const handleExerciseUpdate = (exercise, property, value) => {
    setExerciseSchedules((exerciseSchedules) => ({
      ...exerciseSchedules,
      [exercise]: {
        ...exerciseSchedules[exercise],
        [property]: value,
      },
    }));
  };

  return (
    <WorkoutContainer classNameName='App'>
      <p className='title'>Workout</p>
      <p className='subtitle'>
        Schedule Exercises
        <InlineIcon>
          <i className='icon fas fa-dumbbell'></i>
        </InlineIcon>
      </p>
      <TimeWindow
        start={start}
        setStart={setStart}
        numSets={numSets}
        setNumSets={setNumSets}
        minsBetweenSets={minsBetweenSets}
        setMinsBetweenSets={setMinsBetweenSets}
      />
      {EXERCISES.map((exercise) => {
        const name = EXERCISE_MAP[exercise];
        const exerciseSchedule = exerciseSchedules[exercise];
        const { showExercise, perSet, schedule } = exerciseSchedule;
        return (
          <Exercise
            name={name}
            id={exercise}
            key={exercise}
            perSet={perSet}
            schedule={schedule}
            showExercise={showExercise}
            handleUpdate={(property, value) =>
              handleExerciseUpdate(exercise, property, value)
            }
          />
        );
      })}
    </WorkoutContainer>
  );
};

const WorkoutContainer = styled.div`
  padding: 16px;
`;

const InlineIcon = styled.span`
  margin-left: 12px;
`;

export default Workout;
export { Workout };
