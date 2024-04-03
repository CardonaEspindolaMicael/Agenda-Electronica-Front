import { useFormik } from 'formik';
import { ApiRequests } from '../../api/ApiRequests';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const RestablecerContraceña = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const miEstado = location.state;
    const dataToUpdate = miEstado.objeto;
    const nombreDoctor = dataToUpdate.nombreDoctor;
    const fetchUsers = async (values) => {
        try {
            
            await ApiRequests.putCommon('api/Usuarios/DeletePassword', values);
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
            nombre: dataToUpdate.nombreUsuario,
            nuevaContracena: "",
        },
        onSubmit: values => {
            let errorMessage = "";

            // Password validation
            if (values.nuevaContracena.length < 4 || values.nuevaContracena.length > 20) {
                errorMessage = "La contraseña debe tener entre 4 y 20 caracteres.";
            }
            if (errorMessage) {
                setShowError(true);
                setErrorMessage(errorMessage);
                setTimeout(() => {
                    setShowError(false);
                }, 2000);
            } else {
                fetchUsers(values);
            }
        },
    });

    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2   needs-validation" novalidate onSubmitCapture={formik.handleSubmit}>
            {showError && <Notification message={errorMessage} isSuccess={false} />}
            {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
            <legend>Formulario de Restablecer Contraceñas</legend>
            <hr class="border border-primary border-2 opacity-50"></hr>

            <div className="col-6">
                <label htmlFor="nombre" className="form-label ">Usuario</label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    {...formik.getFieldProps('nombre')}
                    className="form-control "
                    disabled
                />
            </div>
            <div className="col-6">
                <label htmlFor="nombreDoctor" className="form-label ">Doctor</label>
                <input
                    id="nombreDoctor"
                    name="nombreDoctor"
                    type="text"
                   value={nombreDoctor}
                    className="form-control "
                    disabled
                />
            </div>
            
            <div className="col-6">
                <label htmlFor="nuevaContracena" className="form-label ">Nueva Contraceña</label>
                <input
                    id="nuevaContracena"
                    name="nuevaContracena"
                    type="password"
                    {...formik.getFieldProps('nuevaContracena')}
                    className="form-control "
                    required
                />
            </div>
          
            <div class="row justify-content-evenly">
                <CancelButton titulo='Cancelar' navigateTo='back' />
                <button type="submit" className="btn btn-success col-4 mt-4">CAMBIAR CONTRACEÑA</button>
            </div>
        </form>
    );
};

export default RestablecerContraceña;

