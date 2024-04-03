import { useFormik } from 'formik';
import { useState } from 'react';
import { ApiRequests } from '../../api/ApiRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const NuevaHistoria = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUsers = async (values) => {
    try {
      const res = await ApiRequests.postCommonHC('api/HistorialesClinicas/CreateHC', values);
      const codigoHistoriaClinica = res.codigo;
      setShowSuccess(true);  // Muestra mensaje de éxito
      setMessage(`Se registró con éxito la historia clínica con el código # ${codigoHistoriaClinica}`);
      setTimeout(() => {
        setShowSuccess(false); // Oculta el mensaje después de 3 segundos
        navigate(-1); // Redirecciona después del mensaje
      }, 2000);

    } catch (error) {
      console.log(error);
      setShowError(true); // Muestra mensaje de error
      setMessage("¡Algo salió mal!");
      setTimeout(() => {
        setShowError(false); // Oculta el mensaje después de 3 segundos
      }, 2000);
    }
  }

  const formik = useFormik({
    initialValues: {
      ciDoctor: sessionStorage.getItem('idUsuario'),
      ciPaciente: ""
    },
    onSubmit: values => {
      fetchUsers(values);
    },
  });

  return (
    <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2  needs-validation" noValidate onSubmitCapture={formik.handleSubmit}>
      {showSuccess && <Notification message={message} isSuccess={true} />}
      {showError && <Notification message={message} isSuccess={false} />}
      <legend>Formulario de Registro de Historial Clínico</legend>
      <hr className="border border-primary border-2 opacity-50"></hr>
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">CI Doctor</span>
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
          {...formik.getFieldProps('ciDoctor')} disabled />
      </div>
      <div className="input-group input-group-lg">
        <span className="input-group-text" id="inputGroup-sizing-lg">CI Paciente</span>
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
          {...formik.getFieldProps('ciPaciente')} required />
      </div>
      <div className="row justify-content-evenly">
        <CancelButton titulo='Cancelar' navigateTo='back' />
        <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
      </div>
    </form>
  )
}

export default NuevaHistoria;
  