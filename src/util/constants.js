export const localEnv = false;
export const DAYS = ['m', 't', 'w', 'th', 'f'];

export const EXERCISE_MAP = {
  'push-ups': 'Push Ups',
  'sit-ups': 'Sit Ups',
  planks: 'Planks',
  'jumping-jacks': 'Jumping Jacks',
};

export const EXERCISES = Object.keys(EXERCISE_MAP);

export const DEFAULT_SCHEDULE = {
  m: false,
  t: false,
  w: false,
  th: false,
  f: false,
};

export const closedTimeStampFormat = 'MM/DD/YYYY HH:mm';

export const DEFAULT_EXERCISE_SCHEDULE = {
  showExercise: false,
  perSet: 0,
  schedule: { ...DEFAULT_SCHEDULE },
};

export const ModalContentStyles = `
  background-color: white;
  width: 80%;
  border-radius: 5px;
  margin: 0 auto;
  padding: 16px;

  .sub-title {
    font-weight: bold;
    margin-bottom: 16px;
  }

  input {
    margin-bottom: 12px;
  }

  .button {
    margin-right: 8px;
  }
`;
