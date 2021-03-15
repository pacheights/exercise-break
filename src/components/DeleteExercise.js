import React from 'react';
import styled from 'styled-components';
import { ModalContentStyles } from '../util/constants';

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
  ${ModalContentStyles}
  height: 110px;
`;
