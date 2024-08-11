import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal = ({ show, content, onConfirm, onCancel }) => (
  <>
    <Overlay show={show} onClick={onCancel} />
    <ModalWrapper show={show}>
      <h2>Confirm Posting</h2>
      <p>{content}</p>
      <button onClick={onConfirm}>Post</button>
      <button onClick={onCancel}>Cancel</button>
    </ModalWrapper>
  </>
);

export default Modal;
