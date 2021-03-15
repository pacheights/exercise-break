import React, { useState } from 'react';
import styled from 'styled-components';

const AddExercise = ({ addExercise }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newExercise, setNewExercise] = useState('');
  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setNewExercise('');
  };

  const handleInput = (e) => setNewExercise(e.target.value);

  const handleAddExercise = () => {
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
                + Add
              </button>
            </ModalContent>
          </div>
          <button
            className='modal-close is-large'
            aria-label='close'
            onClick={toggleModal}
          />
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
  background-color: white;
  height: 150px;
  width: 80%;
  border-radius: 5px;
  margin: 0 auto;
  padding: 16px;

  .sub-title {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    margin-bottom: 12px;
  }
`;
