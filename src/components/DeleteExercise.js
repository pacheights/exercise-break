import React from 'react';
import styled from 'styled-components';

export const DeleteExercise = ({ modalVisible, onCancel, onDelete }) => {
  return (
    <>
      {modalVisible && (
        <div className='modal is-active'>
          <div className='modal-background'></div>
          <div className='modal-content'>
            <ModalContent>
              <p className='sub-title'>Confirm Delete</p>
              <button className='button is-danger' onClick={onDelete}>
                Delete
              </button>
              <button className='button' onClick={onCancel}>
                Cancel
              </button>
            </ModalContent>
          </div>
        </div>
      )}
    </>
  );
};

const ModalContent = styled.div`
  background-color: white;
  height: 110px;
  width: 80%;
  border-radius: 5px;
  margin: 0 auto;
  padding: 16px;

  .sub-title {
    font-weight: bold;
    margin-bottom: 16px;
  }

  .button {
    margin-right: 8px;
  }
`;
