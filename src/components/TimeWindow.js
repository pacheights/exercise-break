/* global chrome */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { localEnv } from '../util/constants';
import { getTotalMinutes } from '../util/methods';

const TimeWindow = ({}) => {
  const key = 'time_window';
  const [numSets, setNumSets] = useState('0');
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('18:00');

  const handleSetChange = (e) => {
    setNumSets(e.target.value);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start') {
      const start = value;
      if (getTotalMinutes(start) <= getTotalMinutes(end)) {
        setStart(start);
      }
    } else {
      const end = value;
      if (getTotalMinutes(end) >= getTotalMinutes(start)) {
        setEnd(end);
      }
    }
  };

  const saveScheduleChanges = ({ numSets, start, end }) => {
    if (localEnv) return;
    chrome.storage.local.set({
      [key]: {
        numSets,
        start,
        end,
      },
    });
  };

  useEffect(() => {
    if (localEnv) return;
    chrome.storage.local.get([key], (savedValues) => {
      if (savedValues[key]) {
        const { numSets, start, end } = savedValues[key];
        setNumSets(numSets);
        setStart(start);
        setEnd(end);
      } else {
        saveScheduleChanges({ numSets, start, end });
      }
    });
  }, []);

  useEffect(() => {
    saveScheduleChanges({ numSets, start, end });
  }, [numSets, start, end]);

  return (
    <TimeWindowContainer>
      <label className='label'>Time Window</label>
      <RangeContainer>
        <TimePicker
          onChange={handleTimeChange}
          value={start}
          name='start'
          type='time'
          min='09:00'
          max={end}
        />
        <Hyphen>-</Hyphen>
        <TimePicker
          onChange={handleTimeChange}
          value={end}
          name='end'
          type='time'
          min={start}
          max='18:00'
        />
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
