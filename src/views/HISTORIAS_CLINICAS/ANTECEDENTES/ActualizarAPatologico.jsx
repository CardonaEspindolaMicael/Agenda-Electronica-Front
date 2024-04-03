import { useFormik } from 'formik';
import { useState } from 'react';
import { ApiRequests } from '../../../api/ApiRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../../components/BOTONES/Cancelar';
import Notification from '../../../components/ALERT/Notification';

const ActualizarAntecedentePatologico = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const miEstado = location.state;
    const toUpdate = miEstado.objeto;

    const fetchAnt = async (values) => {
        try {
            await ApiRequests.putCommon(`api/HistorialesClinicas/AntecedentePatologico/Update/${miEstado.identificador}`, values);
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
            descripcion: toUpdate.descripcion,
            medicacion: toUpdate.medicacion,
            idTipoAntecedente: toUpdate.idTipoAntecedente,
            idHistoriaClinica: miEstado.idHistoriaClinica,
        },
        onSubmit: values => {
            fetchAnt(values);
        },
        validate: (values) => {
            const errors = {};

            // Validación de campos requeridos y específicos
            if (!values.descripcion) {
                errors.descripcion = 'Este campo es requerido';
            }
            if (!values.medicacion) {
                errors.medicacion = 'Este campo es requerido';
            }
            // Agrega más validaciones según sea necesario

            return errors;
        },
    });

    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row text-start mt-6 g-2 needs-validation" noValidate onSubmitCapture={formik.handleSubmit}>
        {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
        {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
        <legend>Formulario de Registro de Antecedente Patológico</legend>
        <hr className="border border-primary border-2 opacity-50"></hr>

        {/* Campos del formulario */}


        <div className="mb-3 col-4">
            <label htmlFor="idTipoAntecedente" className="form-label">
                Tipo Antecedente Patologico
            </label>
            <select
                id="idTipoAntecedente"
                name="idTipoAntecedente"
                className={`form-control ${formik.touched.idTipoAntecedente && formik.errors.idTipoAntecedente ? 'is-invalid' : ''}`}
                value={formik.values.idTipoAntecedente}
                onChange={formik.handleChange}
            >
                <option value="1">Enfermedad</option>
                <option value="2">Alergia</option>
            </select>
            {/* 
            <input
                type="number"
                id="idTipoAntecedente"
                name="idTipoAntecedente"
                className="form-control"
                value={formik.values.idTipoAntecedente}
                onChange={formik.handleChange}
            />*/}
        </div>

        <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
                Descripción
            </label>
            <input
                type="text"
                id="descripcion"
                name="descripcion"
                className={`form-control ${formik.touched.descripcion && formik.errors.descripcion ? 'is-invalid' : ''}`}
                value={formik.values.descripcion}
                onChange={formik.handleChange}
            />
            <div className="invalid-feedback">
                {formik.touched.descripcion && formik.errors.descripcion}
            </div>
        </div>

        <div className="mb-3 col-6">
            <label htmlFor="medicacion" className="form-label">
                Medicación
            </label>
            <input
                type="text"
                id="medicacion"
                name="medicacion"
                className={`form-control ${formik.touched.medicacion && formik.errors.medicacion ? 'is-invalid' : ''}`}
                value={formik.values.medicacion}
                onChange={formik.handleChange}
            />
            <div className="invalid-feedback">
                {formik.touched.medicacion && formik.errors.medicacion}
            </div>
        </div>

        {/* Botones */}
        <div className="row justify-content-evenly">
            <CancelButton titulo='Cancelar' navigateTo='back' />
            <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
        </div>
    </form>
    )
}

export default ActualizarAntecedentePatologico;
