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
    <div className='modal-list'>
      <button type='button' className='button' onClick={handleOpenFieldModal} >
        入力フィールド追加
      </button>
      <ReactModal isOpen={fieldModal} contentLabel="Field Modal">
        <div className='modal'>
          <div class="modal-container">
            <Fields onAddInput={onAddInput}/>
          </div>
          <button className="button" onClick={handleCloseFieldModal}>Close</button>
        </div>
      </ReactModal>

      <button type='button' className='button' onClick={handleOpenTemplateModal}>
        テンプレート変更
      </button>
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