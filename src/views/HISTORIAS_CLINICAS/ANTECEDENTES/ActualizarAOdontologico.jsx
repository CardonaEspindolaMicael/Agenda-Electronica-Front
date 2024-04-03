import { useFormik } from 'formik';
import { useState } from 'react';
import { ApiRequests } from '../../../api/ApiRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../../components/BOTONES/Cancelar';
import Notification from '../../../components/ALERT/Notification';

const ActualizarAntecedenteOdontologico = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const miEstado = location.state;
    const toUpdate = miEstado.objeto;
    const fetchAnt = async (values) => {
        try {
            await ApiRequests.putCommon(`api/HistorialesClinicas/AntecedenteOdontologico/Update/${miEstado.identificador}`, values);
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
            tratamientoAnterior: toUpdate.tratamientoAnterior,
            fechaTratamientoAnterior: toUpdate.fechaTratamientoAnterior,
            frecuenciaCepillado: toUpdate.frecuenciaCepillado,
            tipoCepilloDental: toUpdate.tipoCepilloDental,
            usaEnjuagueBucal: toUpdate.usaEnjuagueBucal,
            usaHiloDental: toUpdate.usaHiloDental,
            usaPastaDental: toUpdate.usaPastaDental,
            idHistoriaClinica: miEstado.idHistoriaClinica,
        },
        onSubmit: values => {
            fetchAnt(values);
        },
        validate: (values) => {
            const errors = {};

            // Validación de campos requeridos y específicos
            if (!values.tratamientoAnterior) {
                errors.tratamientoAnterior = 'Este campo es requerido';
            }
            if (!values.fechaTratamientoAnterior) {
                errors.fechaTratamientoAnterior = 'Este campo es requerido';
            }
            if (!values.frecuenciaCepillado) {
                errors.frecuenciaCepillado = 'Este campo es requerido';
            }
            if (!values.tipoCepilloDental) {
                errors.tipoCepilloDental = 'Este campo es requerido';
            }
            // Agrega más validaciones según sea necesario

            return errors;
        },
    });

    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row text-start mt-6 g-2 needs-validation" noValidate onSubmitCapture={formik.handleSubmit}>
            {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
            {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
            <legend>Formulario de Actualización de Antecedente Odontológico</legend>
            <hr className="border border-primary border-2 opacity-50"></hr>

            {/* Campos del formulario */}
            <div className="mb-3">
                <label htmlFor="tratamientoAnterior" className="form-label">
                    Tratamiento Anterior
                </label>
                <input
                    type="text"
                    id="tratamientoAnterior"
                    name="tratamientoAnterior"
                    className={`form-control ${formik.touched.tratamientoAnterior && formik.errors.tratamientoAnterior ? 'is-invalid' : ''}`}
                    value={formik.values.tratamientoAnterior}
                    onChange={formik.handleChange}
                />
                <div className="invalid-feedback">
                    {formik.touched.tratamientoAnterior && formik.errors.tratamientoAnterior}
                </div>
            </div>

            <div className="mb-3 col-4">
                <label htmlFor="fechaTratamientoAnterior" className="form-label">
                    Fecha Tratamiento Anterior
                </label>
                <input
                    type="date"
                    id="fechaTratamientoAnterior"
                    name="fechaTratamientoAnterior"
                    className={`form-control ${formik.touched.fechaTratamientoAnterior && formik.errors.fechaTratamientoAnterior ? 'is-invalid' : ''}`}
                    value={formik.values.fechaTratamientoAnterior}
                    onChange={formik.handleChange}
                />
                <div className="invalid-feedback">
                    {formik.touched.fechaTratamientoAnterior && formik.errors.fechaTratamientoAnterior}
                </div>
            </div>

            <div className="col-4">
                <label htmlFor="frecuenciaCepillado" className="form-label">
                    Frecuencia de Cepillado por Dia
                </label>
                <input
                    type="text"
                    id="frecuenciaCepillado"
                    name="frecuenciaCepillado"
                    className={`form-control ${formik.touched.frecuenciaCepillado && formik.errors.frecuenciaCepillado ? 'is-invalid' : ''}`}
                    value={formik.values.frecuenciaCepillado}
                    onChange={formik.handleChange}
                />
                <div className="invalid-feedback">
                    {formik.touched.frecuenciaCepillado && formik.errors.frecuenciaCepillado}
                </div>
            </div>
            <div className="col-4">
                <label htmlFor="tipoCepilloDental" className="form-label">
                    Tipo de Cerdas del Cepillo Dental
                </label>
                <select
                    id="tipoCepilloDental"
                    name="tipoCepilloDental"
                    className={`form-control ${formik.touched.tipoCepilloDental && formik.errors.tipoCepilloDental ? 'is-invalid' : ''}`}
                    value={formik.values.tipoCepilloDental}
                    onChange={formik.handleChange}
                >
                    <option value="Suave">Suave</option>
                    <option value="Medio">Medio</option>
                    <option value="Duro">Duro</option>
                </select>
                <div className="invalid-feedback">
                    {formik.touched.tipoCepilloDental && formik.errors.tipoCepilloDental}
                </div>
            </div>
            

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    id="usaEnjuagueBucal"
                    name="usaEnjuagueBucal"
                    className="form-check-input"
                    checked={formik.values.usaEnjuagueBucal}
                    onChange={formik.handleChange}
                />
                <label htmlFor="usaEnjuagueBucal" className="form-check-label">
                    Usa Enjuague Bucal
                </label>
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    id="usaHiloDental"
                    name="usaHiloDental"
                    className="form-check-input"
                    checked={formik.values.usaHiloDental}
                    onChange={formik.handleChange}
                />
                <label htmlFor="usaHiloDental" className="form-check-label">
                    Usa Hilo Dental
                </label>
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    id="usaPastaDental"
                    name="usaPastaDental"
                    className="form-check-input"
                    checked={formik.values.usaPastaDental}
                    onChange={formik.handleChange}
                />
                <label htmlFor="usaPastaDental" className="form-check-label">
                    Usa Pasta Dental
                </label>
            </div>

            {/* Botones */}
            <div className="row justify-content-evenly">
                <CancelButton titulo='Cancelar' navigateTo='back' />
                <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
            </div>
        </form>
    )
}

export default ActualizarAntecedenteOdontologico;
