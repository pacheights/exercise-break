/* global chrome */
import React from 'react';
import { Exercise, TimeWindow } from '../components';
import styled from 'styled-components';
import { EXERCISE_MAP, localEnv } from '../util/constants';
import { buildWorkoutSchedule } from '../util/methods';

const EXERCISES = Object.keys(EXERCISE_MAP);

const Workout = () => {
  if (!localEnv) {
    chrome.storage.onChanged.addListener(function (changes) {
      chrome.storage.local.get(null, (savedValues) => {
        // console.log(savedValues);
        buildWorkoutSchedule(savedValues);
      });
    });
  }

  return (
    <WorkoutContainer classNameName='App'>
      <p className='title'>Workout</p>
      <p className='subtitle'>
        Schedule Exercises
        <InlineIcon>
          <i className='icon fas fa-dumbbell'></i>
        </InlineIcon>
      </p>
      <TimeWindow />
      {EXERCISES.map((exercise) => {
        const name = EXERCISE_MAP[exercise];
        return <Exercise name={name} id={exercise} key={exercise} />;
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
