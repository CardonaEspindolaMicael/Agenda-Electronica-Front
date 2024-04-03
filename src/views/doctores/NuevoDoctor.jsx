import { useFormik } from 'formik';
import { ApiRequests } from '../../api/ApiRequests';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const NuevoDoctor = () => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [sucursales, setSucursales] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUsers = async (values) => {
    try {
      await ApiRequests.postCommon('api/Doctores/Create', values);

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
  useEffect(() => {
    const fetchSucursal = async () => {
      try {
        const sucursalesEncontradas = await ApiRequests.getCommon('api/Sucursales/');
        setSucursales(sucursalesEncontradas);

      } catch (error) {
        console.log(error);
        alert(error)
      }
    }
    fetchSucursal()
  }, [])

  const formik = useFormik({
    initialValues: {
      documentoIdentidad: "",
      genero: "",
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      edad: "",
      direccion: "",
      numeroCelular: "",
      correo: "",
      especialidad: "",
      idSucursal: 1
    },
    onSubmit: values => {
      fetchUsers(values);
    },
  });
console.log(formik)
  return (
    <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2 needs-validation " novalidate onSubmitCapture={formik.handleSubmit}>
      {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
      {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
      <legend>Formulario de Registro de Doctores</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <div className="col-6">
        <label htmlFor="documentoIdentidadDoctor" className="form-label ">Número de Carnet</label>
        <input
          id="documentoIdentidadDoctor"
          name="documentoIdentidadDoctor"
          type="text"
          {...formik.getFieldProps('documentoIdentidad')}
          className="form-control "
          placeholder="Ejemplo: 123456789"
          required
        />
      </div>

      <div className="col-6">
        <label htmlFor="generoDoctor" className="form-label">Género</label>
        <select
          id="generoDoctor"
          name="generoDoctor"
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
        <label htmlFor="nombreDoctor" className="form-label">Nombre</label>
        <input
          id="nombreDoctor"
          name="nombreDoctor"
          type="text"
          {...formik.getFieldProps('nombre')}
          className="form-control"
          placeholder="Ejemplo: Juan"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="apellidosDoctor" className="form-label">Apellidos</label>
        <input
          id="apellidosDoctor"
          name="apellidosDoctor"
          type="text"
          {...formik.getFieldProps('apellidos')}
          className="form-control"
          placeholder="Ejemplo: Pérez Gómez"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="fechaNacimientoDoctor" className="form-label">Fecha de Nacimiento</label>
        <input
          id="fechaNacimientoDoctor"
          name="fechaNacimientoDoctor"
          type="date"
          {...formik.getFieldProps('fechaNacimiento')}
          className="form-control"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="edadDoctor" className="form-label">Edad</label>
        <input
          id="edadDoctor"
          name="edadDoctor"
          type="number"
          {...formik.getFieldProps('edad')}
          className="form-control"
          placeholder="Ejemplo: 25"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="direccionDoctor" className="form-label">Dirección</label>
        <input
          id="direccionDoctor"
          name="direccionDoctor"
          type="text"
          {...formik.getFieldProps('direccion')}
          className="form-control"
          placeholder="Ejemplo: Calle 123, Ciudad"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="numeroCelularDoctor" className="form-label">Teléfono Celular</label>
        <input
          id="numeroCelularDoctor"
          name="numeroCelularDoctor"
          type="text"
          {...formik.getFieldProps('numeroCelular')}
          className="form-control"
          placeholder="Ejemplo: 555-1234"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="correoDoctor" className="form-label">Correo</label>
        <input
          id="correoDoctor"
          name="correoDoctor"
          type="text"
          {...formik.getFieldProps('correo')}
          className="form-control"
          placeholder="Ejemplo: juan@example.com"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="ocupacionDoctor" className="form-label">Especialidad</label>
        <input
          id="ocupacionDoctor"
          name="ocupacionDoctor"
          type="text"
          {...formik.getFieldProps('especialidad')}
          className="form-control"
          required
        />
      </div>
      <div className="col-6">
        <label htmlFor="sucursalDoctor" className="form-label">Sucursales</label>
        <select
          id="sucursalDoctor"
          name="sucursalDoctor"
          {...formik.getFieldProps('idSucursal')}
          className="form-control custom-select"
          required
        >

          {
            sucursales.map((sucursal) => (
              <option key={sucursal.id} value={parseInt(sucursal.id)}>{sucursal.nombre}</option>
            ))
          }
        </select>
      </div>
      <div class="row justify-content-evenly">
        <CancelButton titulo='Cancelar' navigateTo='back' />
        <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
      </div>
    </form>
  );
}
export default NuevoDoctor;
