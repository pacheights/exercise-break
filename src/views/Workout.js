/* global chrome */
import React, { useState, useEffect } from 'react';
import { AddExercise, Exercise, TimeWindow } from '../components';
import styled from 'styled-components';
import {
  EXERCISE_MAP,
  localEnv,
  EXERCISES,
  DEFAULT_EXERCISE_SCHEDULE,
} from '../util/constants';
import {
  buildWorkoutSchedule,
  getDefaultExerciseSchedule,
} from '../util/methods';
import moment from 'moment';

const Workout = () => {
  const [numSets, setNumSets] = useState('0');
  const [start, setStart] = useState('09:00');
  const [minsBetweenSets, setMinsBetweenSets] = useState('0');
  const [exerciseSchedules, setExerciseSchedules] = useState(() =>
    getDefaultExerciseSchedule()
  );
  const [customExercises, setCustomExercises] = useState({});

  useEffect(() => {
    if (!localEnv) {
      chrome.storage.local.get(null, (savedValues) => {
        console.log(savedValues);
        savedValues['numSets'] && setNumSets(savedValues['numSets']);
        savedValues['start'] && setStart(savedValues['start']);
        savedValues['minsBetweenSets'] &&
          setMinsBetweenSets(savedValues['minsBetweenSets']);
        savedValues['exerciseSchedules'] &&
          setExerciseSchedules(savedValues['exerciseSchedules']);
        savedValues['customExercises'] &&
          setCustomExercises(savedValues['customExercises']);
      });
    }
  }, []);

  useEffect(() => {
    const workout = buildWorkoutSchedule({
      exerciseSchedules,
      numSets,
      start,
      minsBetweenSets,
    });

    if (!localEnv) {
      chrome.storage.local.set({
        workout,
        numSets,
        start,
        minsBetweenSets,
        exerciseSchedules,
      });
    }
  }, [numSets, start, minsBetweenSets, exerciseSchedules]);

  useEffect(() => {
    if (localEnv) return;
    chrome.storage.local.set({
      customExercises,
    });
  }, [customExercises]);

  const handleExerciseUpdate = (exercise, property, value) => {
    setExerciseSchedules((exerciseSchedules) => ({
      ...exerciseSchedules,
      [exercise]: {
        ...exerciseSchedules[exercise],
        [property]: value,
      },
    }));
  };

  const handleAddExercise = (exercise) => {
    const exerciseId = `${exercise} ${moment().unix()}`;
    setCustomExercises((customExercises) => ({
      ...customExercises,
      [exerciseId]: exercise,
    }));

    setExerciseSchedules((exerciseSchedules) => ({
      ...exerciseSchedules,
      [exerciseId]: { ...DEFAULT_EXERCISE_SCHEDULE, showExercise: true },
    }));
  };

  const handleDeleteExercise = (exerciseId) => {
    setCustomExercises((customExercises) => {
      const customCopy = { ...customExercises };
      delete customCopy[exerciseId];
      return customCopy;
    });

    setExerciseSchedules((exerciseSchedules) => {
      const scheduleCopy = { ...exerciseSchedules };
      delete scheduleCopy[exerciseId];
      return scheduleCopy;
    });
  };

  const CUSTOM_EXERCISES = Object.keys(customExercises);

  const createExerciseComponent = (exercise, MAP, custom) => {
    const name = MAP[exercise];
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
        custom={custom}
        deleteExercise={handleDeleteExercise}
      />
    );
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
      {EXERCISES.map((exercise) =>
        createExerciseComponent(exercise, EXERCISE_MAP, false)
      )}
      {CUSTOM_EXERCISES.map((exercise) =>
        createExerciseComponent(exercise, customExercises, true)
      )}
      <AddExercise addExercise={handleAddExercise} />
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
