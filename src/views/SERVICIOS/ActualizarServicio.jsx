import { useFormik } from 'formik';
import { useState } from 'react';
import { ApiRequests } from '../../api/ApiRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const ActualizarServicio = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const miEstado = location.state;
  const dataToUpdate = miEstado.objeto;
  console.log(dataToUpdate)
  const fetchUsers = async (values) => {
    try {
      await ApiRequests.putCommon(`api/Servicios/Update/${miEstado.identificador}`, values);
      setShowSuccess(true);  // Muestra mensaje de éxito
      setTimeout(() => {
        setShowSuccess(false); // Oculta el mensaje después de 3 segundos
        navigate(-1); // Redirecciona después del mensaje
      }, 2000);
    } catch (error) {
      console.log(error);
      setShowError(true); // Muestra mensaje de error
      setTimeout(() => {
        setShowError(false); // Oculta el mensaje después de 3 segundos
      }, 2000);
    }
  }

  const formik = useFormik({
    initialValues: {
      nombre: dataToUpdate.nombre,
      descripcion:dataToUpdate.descripcion
    },
    onSubmit: values => {
      fetchUsers(values);
    },
  });

  return (
    <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2  needs-validation" novalidate onSubmitCapture={formik.handleSubmit}>
     {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
      {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
    <legend>Formulario de Registro de Servicios</legend>
     <hr class="border border-primary border-2 opacity-50"></hr>   
     
      <div className="input-group input-group-lg">
       <span className="input-group-text" id="inputGroup-sizing-lg">Servicio</span>
       <input
         type="text"
         className="form-control"
         aria-label="Sizing example input"
         aria-describedby="inputGroup-sizing-lg"
         {...formik.getFieldProps('nombre')}
         required
       />
     </div>
     <div className="form-floating">
       <textarea
         className="form-control"
         placeholder="Leave a comment here"
         id="floatingTextarea2"
         style={{ height: '200px' }}
         {...formik.getFieldProps('descripcion')}
         required
       />
       <label htmlFor="floatingTextarea2">Descripcion...</label>
     </div>
     <div class="row justify-content-evenly">
       <CancelButton titulo='Cancelar' navigateTo='back' />
       <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
     </div>
   </form>
  )
}

export default ActualizarServicio