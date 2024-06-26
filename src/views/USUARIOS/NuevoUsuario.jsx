import { useFormik } from 'formik';
import { ApiRequests } from '../../api/ApiRequests';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const NuevoUsuario = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [Roles, setRoles] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async (values) => {
        try {
            await ApiRequests.postCommon('/usuario/registroIndAl', values);
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
                const RolesEncontradas = await ApiRequests.getCommon('/rol');
                setRoles(RolesEncontradas);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoles();
    }, [])
    const formik = useFormik({
        initialValues: {
            ci: "",
            nombre: "",
            apellidos: "",
            correo: "",
            sexo: "M",
            telefono:"",
            gradoA:"",
            paraleloA:""
        },
        onSubmit: values => {
            console.log(values.ci , values.nombre , values.apellidos,values.correo ,values.sexo ,values.telefono,values.gradoA ,values.paraleloA)
            if (!values.ci || !values.nombre || !values.apellidos || !values.correo || !values.sexo || !values.telefono || !values.gradoA || !values.paraleloA) {
                alert('Por favor, inserte todos los datos');
            } else {
                fetchUsers(values);
            }
        },
    });
    
    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2 needs-validation " noValidate onSubmitCapture={formik.handleSubmit}>
            {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
            {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
            <legend>Formulario de Registro de Usuarios</legend>
            <hr className="border border-primary border-2 opacity-50"></hr>

            <div className="col-6">
                <label htmlFor="ci" className="form-label">Carnet</label>
                <input
                    id="ci"
                    name="ci"
                    type="text"
                    {...formik.getFieldProps('ci')}
                    className="form-control "
                    required
                />
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
                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                <input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    {...formik.getFieldProps('apellidos')}
                    className="form-control "
                    required
                />
            </div>
            <div className="col-6">
                <label htmlFor="correo" className="form-label">Correo</label>
                <input
                    id="correo"
                    name="correo"
                    type="email"
                    {...formik.getFieldProps('correo')}
                    className="form-control "
                    required
                />
            </div>
            <div className="col-6">
                <label htmlFor="sexo" className="form-label">Sexo</label>
                <select
                    id="sexo"
                    name="sexo"
                    {...formik.getFieldProps('sexo')}
                    className="form-control custom-select"
                    required
                >
                    <option value={'M'}>Masculino</option>
                    <option value={'F'}>Femenino</option>

                </select>
            </div>
            <div className="col-6">
                <label htmlFor="telefono" className="form-label">Telefono</label>
                <input
                    id="telefono"
                    name="telefono"
                    type="number"
                    {...formik.getFieldProps('telefono')}
                    className="form-control "
                    required
                />
            </div>
            <div className="col-2">
                <label htmlFor="gradoA" className="form-label">Curso: </label>
                <input
                    id="gradoA"
                    name="gradoA"
                    type="number"
                    {...formik.getFieldProps('gradoA')}
                    className="form-control "
                    required
                />
            </div>
            <div className="col-2">
            <label htmlFor="paraleloA" className="form-label">paralelo: </label>
                <input
                    id="paraleloA"
                    name="paraleloA"
                    type="text"
                    {...formik.getFieldProps('paraleloA')}
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
