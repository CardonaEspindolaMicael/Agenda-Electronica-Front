import React from 'react';
import './Alert.css';
import { usuarioApis } from '../../apis/apiUsuario';

export const DeleteButton = ({
  titulo = "Eliminar",
  endpoint="",
  identificador,
  elimino="false",
  backgroundColorButton = "#f53615", 
  colorTextButton = "#fff", 
  heighButton = "20px",
  widthButton = "100%",
  OnClickFn,
}) => {
  
 
  const handleGuardarClick = () => {
    formik.handleSubmit();
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
    }, 1000);
  };

  return (
    <div className="alerta-container">
    {alertaVisible && (
      <div className="alert alert-success alerta-flotante" role="alert">
        ¡Guardado correctamente!
      </div>
    )}
  </div>
  );
};

export default DeleteButton;
