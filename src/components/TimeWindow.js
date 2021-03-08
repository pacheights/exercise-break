import React, { useState } from 'react';
import styled from 'styled-components';

const TimeWindow = ({}) => {
  const [numSets, setNumSets] = useState('0');

  const handleSetChange = (e) => {
    setNumSets(e.target.value);
  };

  return (
    <TimeWindowContainer>
      <label className='label'>Time Window</label>
      <RangeContainer>
        <TimePicker type='time' name='start' min='09:00' max='18:00' />
        <Hyphen>-</Hyphen>
        <TimePicker type='time' name='start' min='09:00' max='18:00' />
      </RangeContainer>
      <label className='label'>Sets Per Day ({numSets})</label>
      <input
        value={numSets}
        onChange={handleSetChange}
        type='range'
        min='0'
        max='12'
      />
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

export { TimeWindow };
export default TimeWindow;
