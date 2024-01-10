import React, { useState } from 'react';
import ReactModal from 'react-modal';
import Fields from './Fields';
import Templates from './Templates';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    <div className='modal-list'>
      <li 
        className="row"
        onClick={handleOpenFieldModal}
      >
        <ChevronRightIcon/>フィールド
      </li>
      <ReactModal isOpen={fieldModal} contentLabel="Field Modal">
        <div className='modal'>
          <div class="modal-container">
            <Fields onAddInput={onAddInput}/>
          </div>
          <button className="button" onClick={handleCloseFieldModal}>Close</button>
        </div>
      </ReactModal>

      <li
        className='row'
        onClick={handleOpenTemplateModal}
      >
        <ChevronRightIcon/>テンプレート
      </li>
      <ReactModal isOpen={templateModal} contentLabel="Template Modal">
        <div className='modal'>
          <div class="modal-container">
            <Templates onAddTemplate={onAddTemplate}/>
          </div>
          <button className="button" onClick={handleCloseTemplateModal}>Close</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Modal;