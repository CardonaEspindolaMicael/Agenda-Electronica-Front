import { useFormik } from 'formik';
import { useState } from 'react';
import { ApiRequests } from '../../api/ApiRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const ActualizarPaciente = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const miEstado = location.state;
  const usuarioToUpdate = miEstado.objeto;
  const fetchUsers = async (values) => {
    try {
      await ApiRequests.putCommon(`api/Pacientes/Update/${miEstado.identificador}`, values);
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
      documentoIdentidad: usuarioToUpdate.documentoIdentidad,
      genero: usuarioToUpdate.genero,
      nombre: usuarioToUpdate.nombre,
      apellidos: usuarioToUpdate.apellidos,
      fechaNacimiento: usuarioToUpdate.fechaNacimiento,
      edad: usuarioToUpdate.edad,
      direccion: usuarioToUpdate.direccion,
      numeroCelular: usuarioToUpdate.numeroCelular,
      correo: usuarioToUpdate.correo,
      ocupacion: usuarioToUpdate.ocupacion,
      estadoCivil: usuarioToUpdate.estadoCivil
    },
    onSubmit: values => {
      fetchUsers(values);
    },
  });
  return (
    <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2  needs-validation" novalidate onSubmitCapture={formik.handleSubmit}>
      {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
      {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
      <legend>Formulario de Registro de Pacientes</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <div className="col-6">
        <label htmlFor="documentoIdentidadPaciente" className="form-label">Número de Carnet</label>
        <input
          id="documentoIdentidadPaciente"
          name="documentoIdentidadPaciente"
          type="text"
          {...formik.getFieldProps('documentoIdentidad')}
          className="form-control "
          placeholder="Ejemplo: 123456789"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="generoPaciente" className="form-label">Género</label>
        <select
          id="generoPaciente"
          name="generoPaciente"
          {...formik.getFieldProps('genero')}
          className="form-control custom-select"
          required
        >
          <option value="">Seleccionar Género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>
      <div className="col-6">
        <label htmlFor="nombrePaciente" className="form-label">Nombre</label>
        <input
          id="nombrePaciente"
          name="nombrePaciente"
          type="text"
          {...formik.getFieldProps('nombre')}
          className="form-control"
          placeholder="Ejemplo: Juan"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="apellidosPaciente" className="form-label">Apellidos</label>
        <input
          id="apellidosPaciente"
          name="apellidosPaciente"
          type="text"
          {...formik.getFieldProps('apellidos')}
          className="form-control"
          placeholder="Ejemplo: Pérez Gómez"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="fechaNacimientoPaciente" className="form-label">Fecha de Nacimiento</label>
        <input
          id="fechaNacimientoPaciente"
          name="fechaNacimientoPaciente"
          type="date"
          {...formik.getFieldProps('fechaNacimiento')}
          className="form-control"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="edadPaciente" className="form-label">Edad</label>
        <input
          id="edadPaciente"
          name="edadPaciente"
          type="number"
          {...formik.getFieldProps('edad')}
          className="form-control"
          placeholder="Ejemplo: 25"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="direccionPaciente" className="form-label">Dirección</label>
        <input
          id="direccionPaciente"
          name="direccionPaciente"
          type="text"
          {...formik.getFieldProps('direccion')}
          className="form-control"
          placeholder="Ejemplo: Calle 123, Ciudad"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="numeroCelularPaciente" className="form-label">Teléfono Celular</label>
        <input
          id="numeroCelularPaciente"
          name="numeroCelularPaciente"
          type="text"
          {...formik.getFieldProps('numeroCelular')}
          className="form-control"
          placeholder="Ejemplo: 555-1234"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="correoPaciente" className="form-label">Correo</label>
        <input
          id="correoPaciente"
          name="correoPaciente"
          type="text"
          {...formik.getFieldProps('correo')}
          className="form-control"
          placeholder="Ejemplo: juan@example.com"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="ocupacionPaciente" className="form-label">Ocupación</label>
        <input
          id="ocupacionPaciente"
          name="ocupacionPaciente"
          type="text"
          {...formik.getFieldProps('ocupacion')}
          className="form-control"
          placeholder="Ejemplo: Estudiante"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="estadoCivilPaciente" className="form-label">Estado Civil</label>
        <input
          id="estadoCivilPaciente"
          name="estadoCivilPaciente"
          type="text"
          {...formik.getFieldProps('estadoCivil')}
          className="form-control"
          placeholder="Ejemplo: Soltero/a"
          required
        />
      </div>
      <div class="row justify-content-evenly">
        <CancelButton titulo='Cancelar' navigateTo='back' />
        <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
      </div>
    </form>
  );
}
export default ActualizarPaciente;
