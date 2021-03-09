import { EXERCISE_MAP, daysOrder } from './constants';

export const buildWorkoutSchedule = (savedValues) => {
  const days = {
    m: {},
    t: {},
    w: {},
    th: {},
    f: {},
  };

  // add intervals to days
  const startMins = getTotalMinutes(savedValues['time_window']['start']);
  const endMins = getTotalMinutes(savedValues['time_window']['end']);
  const exerciseWindowMins = endMins - startMins;

  console.log(endMins - startMins, savedValues);
  const numSets = parseInt(savedValues['time_window']['num_sets']);
  const minsBetweenSets = Math.floor(exerciseWindowMins / numSets);

  for (let i = 0; i < numSets; i++) {
    // for ()
  }

  // add exercises to days
  for (const exercise of Object.keys(EXERCISE_MAP)) {
  }
};

export const getTotalMinutes = (time) => {
  const [hrs, mins] = time.split(':');
  const totalMins = parseInt(hrs) * 60 + parseInt(mins);
  return totalMins;
};
