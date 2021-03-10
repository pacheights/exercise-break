/* global chrome */
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const getTimeFromTimestamp = (timestamp) => timestamp.slice(0, 4);

const TimeWindow = ({
  numSets,
  setNumSets,
  start,
  setStart,
  minsBetweenSets,
  setMinsBetweenSets,
}) => {
  const handleSetChange = (e) => {
    setNumSets(e.target.value);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start') {
      const start = value;
      setStart(start);
    }
  };

  const handleMinsBetweenSetsChange = (e) => {
    setMinsBetweenSets(e.target.value);
  };

  const end = moment(`02/02/2002 ${getTimeFromTimestamp(start)}`)
    .add(parseInt(minsBetweenSets) * parseInt(numSets), 'm')
    .format('HH:mm');

  return (
    <TimeWindowContainer>
      <SetsPerDayContainer>
        <label className='label'>Sets Per Day ({numSets})</label>
        <input
          value={numSets}
          onChange={handleSetChange}
          type='range'
          min='0'
          max='12'
        />
      </SetsPerDayContainer>
      <MinsBetweenSetsContainer>
        <label className='label'>Mins Between Sets ({minsBetweenSets})</label>
        <input
          value={minsBetweenSets}
          onChange={handleMinsBetweenSetsChange}
          type='range'
          min='0'
          max='180'
        />
      </MinsBetweenSetsContainer>
      <label className='label'>Time Window</label>
      <RangeContainer>
        <TimePicker
          onChange={handleTimeChange}
          value={start}
          name='start'
          type='time'
        />
        <Hyphen>-</Hyphen>
        <TimePicker disabled={true} value={end} name='end' type='time' />
      </RangeContainer>
    </TimeWindowContainer>
  );
};

const TimeWindowContainer = styled.div`
  margin-bottom: 24px;
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Hyphen = styled.p`
  margin: 0 10px;
`;

const TimePicker = styled.input`
  height: 35px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid lightgray;
`;

const SetsPerDayContainer = styled.div`
  margin-bottom: 16px;
`;

const MinsBetweenSetsContainer = styled.div`
  margin-bottom: 16px;
`;

export { TimeWindow };
export default TimeWindow;
