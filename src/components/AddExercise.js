import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalContentStyles } from '../util/constants';

const AddExercise = ({ addExercise }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState('');
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setNewExercise('');
  };

  const handleInput = (e) => setNewExercise(e.target.value);

  const handleAddExercise = () => {
    if (!newExercise) return;
    addExercise(newExercise);
    toggleModal();
  };

  return (
    <>
      <IconContainer>
        <i className='fas fa-plus-circle' onClick={toggleModal} />
      </IconContainer>
      {modalVisible && (
        <div className='modal is-active'>
          <div className='modal-background'></div>
          <div className='modal-content'>
            <ModalContent>
              <p className='sub-title'>Add Exercise</p>
              <input
                className='input'
                type='text'
                placeholder='Add exercise'
                onChange={handleInput}
                value={newExercise}
              />
              <button className='button is-info' onClick={handleAddExercise}>
                Add
              </button>
              <button className='button' onClick={toggleModal}>
                Cancel
              </button>
            </ModalContent>
          </div>
        </div>
      )}
    </>
  );
};

export { AddExercise };

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  i {
    font-size: 28px;
    color: lightgray;
    &:hover {
      cursor: pointer;
      opacity: 0.65;
    }
  }
`;

const ModalContent = styled.div`
  ${ModalContentStyles}
  height: 160px;
`;
