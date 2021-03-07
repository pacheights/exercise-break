import React from 'react';
import styled from 'styled-components';

const Exercise = ({}) => {
  return (
    <div clas='exercises-container'>
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>Push Ups</p>
          <i className='card-header-icon fas fa-chevron-down'></i>
        </header>
      </div>
      <div className='card-content'>
        <label className='label'>Schedule</label>
        <Schedule>
          <button className='button'>M</button>
          <button className='button'>T</button>
          <button className='button'>W</button>
          <button className='button'>Th</button>
          <button className='button'>F</button>
        </Schedule>
        <label className='label'>Per Day</label>
        <input
          className='input'
          type='text'
          placeholder='# Per Day'
          style={{ width: 100 }}
        />
      </div>
    </div>
  );
};

const Schedule = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  button {
    min-width: 50px;
  }
`;

export default Exercise;
export { Exercise };
