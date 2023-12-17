import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Fields from './Fields';
import Templates from './Templates';

export const Modal = ({ onAddInput, onAddTemplate }) => {
  const [fieldModal, setFieldModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);

  const handleOpenFieldModal = () => {
    setFieldModal(true);
  }

  const handleCloseFieldModal = () => {
    setFieldModal(false);
  }

  const handleOpenTemplateModal = () => {
    setTemplateModal(true);
  }

  const handleCloseTemplateModal = () => {
    setTemplateModal(false);
  }

  return (
    <div>
      <li 
        className="row"
        onClick={handleOpenFieldModal}
      >
        Field List
      </li>
      <ReactModal
        isOpen={fieldModal}
        contentLabel="Field Modal"
      >
        Field modal
        <Fields onAddInput={onAddInput}/>
        <button onClick={handleCloseFieldModal}>Close</button>
      </ReactModal>

      <li
        className='row'
        onClick={handleOpenTemplateModal}
      >
        Template List
      </li>
      <ReactModal
        isOpen={templateModal}
        contentLabel="Template Modal"
      >
        Template modal
        <Templates onAddTemplate={onAddTemplate}/>
        <button onClick={handleCloseTemplateModal}>Close</button>
      </ReactModal>
    </div>
  );
}

export default Modal;