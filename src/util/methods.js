import { DAYS } from './constants';
import moment from 'moment';

export const buildWorkoutSchedule = ({
  exerciseSchedules,
  numSets,
  start,
  minsBetweenSets,
}) => {
  const workout = {};
  const daySchedule = {};
  const timestamps = [];
  let timestamp = moment(`01/01/2002 ${start}`, 'MM/DD/YYYY HH:mm');
  for (let i = 0; i < numSets; i++) {
    const time = timestamp.format('HH:mm');
    daySchedule[time] = {};
    timestamps.push(time);
    timestamp = timestamp.add(minsBetweenSets, 'm');
  }

  for (const day of DAYS) {
    workout[day] = { ...daySchedule };
  }

  const exercises = Object.keys(exerciseSchedules);
  for (const exercise of exercises) {
    for (const day of DAYS) {
      const isScheduledForDay = exerciseSchedules[exercise].schedule[day];
      const { perSet } = exerciseSchedules[exercise];
      if (isScheduledForDay && parseInt(perSet) > 0) {
        for (const timestamp of timestamps) {
          workout[day][timestamp] = {
            ...workout[day][timestamp],
            [exercise]: perSet,
          };
        }
      }
    }
  }

  return workout;
};
