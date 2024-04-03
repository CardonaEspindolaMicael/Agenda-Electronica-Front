import { useFormik } from 'formik';
import { useState } from 'react';
import { ApiRequests } from '../../../api/ApiRequests';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../../components/BOTONES/Cancelar';
import Notification from '../../../components/ALERT/Notification';

const NuevoAntecedenteGinecologico = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const obj = location.state;
    const historiaClinica = obj.identificador;

    const fetchAnt = async (values) => {
        try {
            await ApiRequests.postCommon('api/HistorialesClinicas/AntecedenteGinecologico/Create', values);
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
            idHistoriaClinica: historiaClinica,
            ultimoPeriodoMenstrual: "",
            problemasMenstruacion: "",
            semanasEmbarazo: 0
        },
        onSubmit: values => {
            fetchAnt(values);
        },

    });

    return (
        <form style={{ margin: '20px 50px 0 50px' }} className="row text-start mt-6 g-2 needs-validation" noValidate onSubmitCapture={formik.handleSubmit}>
            {showSuccess && <Notification message="¡Operación exitosa!" isSuccess={true} />}
            {showError && <Notification message="¡Algo salió mal!" isSuccess={false} />}
            <legend>Formulario de Registro de Antecedente Ginecológico</legend>
            <hr className="border border-primary border-2 opacity-50"></hr>

            <div className="mb-3 col-4">
                <label htmlFor="ultimoPeriodoMenstrual" className="form-label">
                    Último Período Menstrual
                </label>
                <input
                    type="date"
                    id="ultimoPeriodoMenstrual"
                    name="ultimoPeriodoMenstrual"
                    className={"form-control "}
                    {...formik.getFieldProps('ultimoPeriodoMenstrual')}
                />
            </div>


            <div className="mb-3 ">
                <label htmlFor="problemasMenstruacion" className="form-label">
                    Problemas Menstruación
                </label>
                <input
                    type="text"
                    id="problemasMenstruacion"
                    name="problemasMenstruacion"
                    className={"form-control "}
                    {...formik.getFieldProps('problemasMenstruacion')}
                />
            </div>
            <div className="mb-3 col-4">
                <label htmlFor="semanasEmbarazo" className="form-label">
                    Semanas de Embarazo
                </label>
                <input
                    type="number"
                    id="semanasEmbarazo"
                    name="semanasEmbarazo"
                    className="form-control"
                    {...formik.getFieldProps('semanasEmbarazo')}
                />
            </div>

            {/* Botones */}
            <div className="row justify-content-evenly">
                <CancelButton titulo='Cancelar' navigateTo='back' />
                <button type="submit" className="btn btn-success col-4 mt-4">GUARDAR</button>
            </div>
        </form>
    )
}

export default NuevoAntecedenteGinecologico;
