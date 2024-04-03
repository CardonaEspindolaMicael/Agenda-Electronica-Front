import { useFormik } from 'formik';
import { ApiRequests } from '../../api/ApiRequests';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const NuevoUsuario = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [Roles, setRoles] = useState([]);
    const [Doctores, setDoctores] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchUsers = async (values) => {
        try {
            await ApiRequests.postCommon('api/Usuarios/Create', values);
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
        const fetchRoles = async () => {
            try {
                const RolesEncontradas = await ApiRequests.getCommon('api/Roles/');
                setRoles(RolesEncontradas);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoles();
        const fetchDoctor = async () => {
            try {
                const DoctoresEncontradas = await ApiRequests.getCommon('api/Doctores/');
                setDoctores(DoctoresEncontradas);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDoctor()

    }, [])

    const formik = useFormik({
        initialValues: {
            nombre: "",
            contrasena: "",
            idRol: "",
            ciDoctor: ""
        },
        onSubmit: values => {
            fetchUsers(values);
        },
    });

    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2 needs-validation " novalidate onSubmitCapture={formik.handleSubmit}>
            {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
            {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
            <legend>Formulario de Registro de Usuarios</legend>
            <hr class="border border-primary border-2 opacity-50"></hr>

            <div className="col-6">
                <label htmlFor="doctor" className="form-label">Doctor</label>
                <select
                    id="doctor"
                    name="doctor"
                    {...formik.getFieldProps('ciDoctor')}
                    className="form-control custom-select"
                    required
                >
                    {
                        Doctores.map((doctor) => (
                            <option key={doctor.id} value={doctor.documentoIdentidad}>{doctor.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col-6">
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                    id="rol"
                    name="rol"
                    {...formik.getFieldProps('idRol')}
                    className="form-control custom-select"
                    required
                >
                    {
                        Roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        ))
                    }
                </select>
            </div>


            <div className="col-6">
                <label htmlFor="nombre" className="form-label">Usuario</label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    {...formik.getFieldProps('nombre')}
                    className="form-control "
                    required
                />
            </div>

            <div className="col-6">
                <label htmlFor="contrasena" className="form-label">Contraceña</label>
                <input
                    id="contrasena"
                    name="contrasena"
                    type="Password"
                    {...formik.getFieldProps('contrasena')}
                    className="form-control "
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
export default NuevoUsuario;
