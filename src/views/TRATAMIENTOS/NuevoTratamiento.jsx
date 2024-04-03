import { useFormik } from 'formik';
import { ApiRequests } from '../../api/ApiRequests';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import Notification from '../../components/ALERT/Notification';

const NuevoTratamiento = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [Servicios, setServicios] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchUsers = async (values) => {
        try {
            res = await ApiRequests.postCommon('api/Tratamientos/Create', values);
            setShowSuccess(true);  // Muestra mensaje de éxito
            setTimeout(() => {
                setShowSuccess(false); // Oculta el mensaje después de 3 segundos
                navigate(-1); // Redirecciona después del mensaje
            }, 2000);
        } catch (error) {
            alert(error)
            console.log(error);
            setShowError(true); // Muestra mensaje de error
            setTimeout(() => {
                setShowError(false); // Oculta el mensaje después de 3 segundos
            }, 2000);
        }
    }
    useEffect(() => {
        const fetchServicio = async () => {
            try {
                const ServiciosEncontradas = await ApiRequests.getCommon('api/Servicios/');
                setServicios(ServiciosEncontradas);
            } catch (error) {
                console.log(error);
                alert(error)
            }
        }
        fetchServicio()
    }, [])

    const formik = useFormik({
        initialValues: {
            descripcion: "",
            precio: "",
            idServicio: ""
        },
        onSubmit: values => {
            fetchUsers(values);
        },
    });

    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row  mt-6 g-2 needs-validation " novalidate onSubmitCapture={formik.handleSubmit}>
            {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
            {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
            <legend>Formulario de Registro de Tratamientos</legend>
            <hr class="border border-primary border-2 opacity-50"></hr>

            <div className="form-floating">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: '100px' }}
                    {...formik.getFieldProps('descripcion')}
                    required
                />
                <label htmlFor="floatingTextarea2">Descripcion...</label>
            </div>

            <div className="col-6">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input
                    id="precio"
                    name="precio"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    {...formik.getFieldProps('precio')}
                    className="form-control"
                    placeholder="Ejemplo: 123.45"
                    required
                />
            </div>

            <div className="col-6">
                <label htmlFor="servicioTratamiento" className="form-label">Servicios</label>
                <select
                    id="servicioTratamiento"
                    name="servicioTratamiento"
                    {...formik.getFieldProps('idServicio')}
                    className="form-control custom-select"
                    required
                >
                    {
                        Servicios.map((servicio) => (
                            <option key={servicio.id} value={servicio.id}>{servicio.nombre}</option>
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
export default NuevoTratamiento;
