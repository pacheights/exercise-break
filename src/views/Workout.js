/* global chrome */
import React from 'react';
import Exercise from '../components/Exercise';
import styled from 'styled-components';

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
      <Exercise />
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
