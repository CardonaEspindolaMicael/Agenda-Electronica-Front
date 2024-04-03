import React, { useState } from 'react';
import { ApiRequests } from '../../api/ApiRequests';
import ConfirmModal from '../MODAL/QuestionDelete';

export const DeleteButton = ({
  endpoint = "",
  identificador,
  elimino = () => { },
  OnClickFn,
  /*elimino = "false",
  OnClickFn,*/

}) => {

  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    const puntoFinal = `${endpoint}/${identificador}`
    console.log("El endpoint es:", puntoFinal)
    try {
      await ApiRequests.deleteCommon(puntoFinal);
      elimino(true)
    } catch (error) {
      console.log(error);

    }
    setShowModal(false);
  }
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <>
      <button style={{ height: '35px' }}
        onClick={OnClickFn ? OnClickFn : handleShow }
        type="button" className="btn btn-danger col-6">
        <img style={{ height: '25px', width: '25px' }} src=""alt="" />
      </button>

      <ConfirmModal
        showModal={showModal}
        handleConfirm={fetchUsers}
        handleClose={handleClose}
      />
    </>
  );
};

export default DeleteButton;
