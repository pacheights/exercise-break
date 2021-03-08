/* global chrome */
import React from 'react';
import { Exercise, TimeWindow } from '../components';
import styled from 'styled-components';
import { EXERCISES } from '../constants';

const Workout = () => {
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
        const { name, id } = exercise;
        return <Exercise name={name} id={id} key={id} />;
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
