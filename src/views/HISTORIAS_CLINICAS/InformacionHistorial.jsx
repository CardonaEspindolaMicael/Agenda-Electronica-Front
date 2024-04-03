import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelButton from '../../components/BOTONES/Cancelar';
import EditButton from '../../components/BOTONES/Editar';
import NewButton from '../../components/BOTONES/New';
import NewAntButton from '../../components/BOTONES/NewAnt';
import { ApiRequests } from '../../api/ApiRequests';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

const Informacion = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const location = useLocation();
  const navigate = useNavigate();
  const obj = location.state;
  const historiaClinica = obj.objeto;
  const IdhistoriaClinica = obj.identificador;

  const [antecedentesGinecologicos, setAntecedentesGinecologicos] = useState([]);
  const [antecedentesOdontologicos, setAntecedentesOdontologicos] = useState([]);
  const [antecedentesPatologicos, setAntecedentesPatologicos] = useState([]);

  useEffect(() => {
    const fetchAntecedentesGinecologicos = async () => {
      try {
        const response = await ApiRequests.getCommon(`api/HistorialesClinicas/AntecedenteGinecologico/${IdhistoriaClinica}`);
          setAntecedentesGinecologicos(response);

      } catch (error) {
        console.log(error);
      }
    };
    fetchAntecedentesGinecologicos();
  }, []);

  useEffect(() => {
    const fetchAntecedentesOdontologicos = async () => {
      try {
        const response = await ApiRequests.getCommon(`api/HistorialesClinicas/AntecedenteOdontologico/${IdhistoriaClinica}`);
        if(response.response.status != 404){
          setAntecedentesOdontologicos(response);
        }
       
      } catch (error) {
        console.log(error);
      }
    }
    fetchAntecedentesOdontologicos()
  }, []);


  if (!historiaClinica) {
    // Puedes manejar el caso en que no haya información
    return (
      <div style={{ margin: '20px 50px 0 50px' }}>
        <p>No hay información disponible.</p>
        <div className="row justify-content-evenly">
          <CancelButton titulo='Volver' navigateTo='back' />
        </div>
      </div>
    );
  }

  // Si hay información, muestra la tarjeta de Bootstrap con los detalles
  return (
    <div style={{ margin: '20px 50px 0 50px' }}>
      <legend>Informacion de la historia clinica</legend>
      <hr className="border border-primary border-2 opacity-50"></hr>
      <Card>
        <Card.Body className="text-start row">
          <p className="card-text col-4"><strong>Código:</strong> {historiaClinica.codigo}</p>
          <p className="card-text col-4"><strong>Doctor:</strong> {historiaClinica.nombreDoctor}</p>
          <p className="card-text col-4"><strong>Fecha Inicio:</strong> {new Date(historiaClinica.fechaCreacion).toLocaleDateString('es-ES')} </p>
          <p className="card-text col-4"><strong>Paciente:</strong> {historiaClinica.nombrePaciente}</p>
          <p className="card-text col-4"><strong>CI Paciente:</strong> {historiaClinica.ciPaciente}</p>
        </Card.Body>
      </Card>


      <div class="overflow-y-scroll mt-3" style={{ height: 'calc(600px - 150px)', padding: '10px 10px 10px 10px', }}>

        <legend className="text-start mt-1">1.- Antecedentes </legend>
        <hr className="border border-danger border-2 opacity-50"></hr>

        <div className='text-start row ms-3 me-3' >
          <legend className="text-start mt-3">1.1.- Antecedentes Odontologicos</legend>
          <hr className="border border-1 opacity-1"></hr>
          {antecedentesOdontologicos ? (
            <React.Fragment>
              <label className='col-6'><strong>Tratamiento Anterior:</strong> {antecedentesOdontologicos.tratamientoAnterior}</label>
              <label className='col-6'><strong>Fecha Tratamiento Anterior:</strong> {new Date(antecedentesOdontologicos.fechaTratamientoAnterior).toLocaleDateString('es-ES')}</label>
              <label className='col-6'><strong>Frecuencia de Cepillado:</strong> {antecedentesOdontologicos.frecuenciaCepillado}</label>
              <label className='col-6'><strong>Tipo de Cepillo Dental:</strong> {antecedentesOdontologicos.tipoCepilloDental}</label>
              <label className='col-6'><strong>Usa Enjuague Bucal:</strong> {antecedentesOdontologicos.usaEnjuagueBucal ? 'Sí' : 'No'}</label>
              <label className='col-6'><strong>Usa Hilo Dental:</strong> {antecedentesOdontologicos.usaHiloDental ? 'Sí' : 'No'}</label>
              <label className='col-6'><strong>Usa Pasta Dental:</strong> {antecedentesOdontologicos.usaPastaDental ? 'Sí' : 'No'}</label>
              <EditButton
                titulo='Actualizar'
                navigateTo='aaOdontologico'
                object={antecedentesOdontologicos}
                idHistoriaClinica={IdhistoriaClinica}
                identificador={antecedentesOdontologicos.id}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label className='col-6'>No hay antecedente odontológico registrado.</label>
              <NewAntButton titulo='Registrar' navigateTo='naOdontologico' identificador={IdhistoriaClinica} />
            </React.Fragment>
          )}
        </div>
        <div className='text-start row ms-3 me-3'>
          <legend className="text-start mt-3">1.2.- Antecedentes Ginecológicos</legend>
          <hr className="border border-1 opacity-1"></hr>
          {antecedentesGinecologicos ? (
            <React.Fragment>
              <label className='col-6'><strong>Último Período Menstrual:</strong> {new Date(antecedentesGinecologicos.ultimoPeriodoMenstrual).toLocaleDateString('es-ES')}</label>
              <label className='col-6'><strong>Problemas Menstruación:</strong> {antecedentesGinecologicos.problemasMenstruacion}</label>
              <label className='col-6'><strong>Semanas Embarazo:</strong> {antecedentesGinecologicos.semanasEmbarazo}</label>
              <EditButton
                titulo='Actualizar'
                navigateTo='aaGinecologico'
                object={antecedentesGinecologicos}
                idHistoriaClinica={IdhistoriaClinica}
                identificador={antecedentesGinecologicos.id}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label className='col-6' >No hay antecedente ginecológico registrado.</label>
              <NewAntButton titulo='Registrar' navigateTo='naGinecologico' identificador={IdhistoriaClinica} />
            </React.Fragment>
          )}
        </div>


        <div className='text-start row ms-3 me-3'>
          <legend className="text-start mt-3">1.3.- Antecedentes Patológicos</legend>
          <hr className="border border-1 opacity-1"></hr>
          {antecedentesPatologicos ? (
            <React.Fragment>
              <label><strong>Medicación:</strong> {antecedentesPatologicos.medicacion}</label>
              <label><strong>Id Tipo Antecedente:</strong> {antecedentesPatologicos.idTipoAntecedente}</label>
              <label><strong>Id Tipo Antecedente:</strong> {antecedentesPatologicos.idTipoAntecedente}</label>
              <EditButton
                titulo='Actualizar'
                navigateTo='aaPatologico'
                object={antecedentesPatologicos}
                idHistoriaClinica={IdhistoriaClinica}
                identificador={antecedentesPatologicos.id}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <label className='col-6'> No hay antecedentes patológicos registrados.</label>
              <NewAntButton titulo='Registrar' navigateTo='naPatologico' identificador={IdhistoriaClinica} />
            </React.Fragment>
          )}
        </div>

      </div>

      <div className="row justify-content-evenly">
        <CancelButton titulo='Volver' navigateTo='back' />
      </div>
    </div>
  );
};

export default Informacion;
