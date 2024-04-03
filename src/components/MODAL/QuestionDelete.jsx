// ConfirmModal.js
import React from 'react';

const ConfirmModal = ({ showModal, handleConfirm, handleClose }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content text-bg-secondary  ">
          <div className="modal-header">
            <h5 className="modal-title">Confirmación</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de realizar esta acción?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={handleClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
