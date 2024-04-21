import React, { useEffect, useState } from 'react';
import { uploadFile } from '../../firebase/config';
import './comunicado.css'
import { useFormik } from 'formik';
import { v4 } from "uuid";
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiRequests } from '../../api/ApiRequests';
import CancelButton from '../../components/BOTONES/Cancelar';

const Comunicado = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const miEstado = location.state;
  const dataToUpdate = miEstado.objeto;
  const ci_usuario = dataToUpdate.ci;
  const nombreUsuario=dataToUpdate.nombre;
  const ci_administrador = sessionStorage.getItem('ci_usuario');

  /*********************************************************************** */
  
  const postComunicado = async (values) => {
    try {
      await ApiRequests.postCommon(`/comunicado`, values);
      setTimeout(() => {
        navigate(-1); 
      }, 500);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        navigate(-1); 
      }, 500);
    }
  }


  /*********************************************************************** */
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  
  };


  const formik = useFormik({
    initialValues: {
      id_comunicado:v4(),
      ci_usuario: ci_usuario,
      descripcion: "",
      url: "",
      ci_administrador: ci_administrador,
    },
    onSubmit: async values => {
      if (!!!file) {
        alert('Verifique si envio un documento')
        return;
      }
      try {
        setLoading(true);
        const tipoDato=(file.type).split('/')[1]
      
       const result = await uploadFile(file,tipoDato);
        setLoading(false);
        alert('Documento enviado con exito. Redireccionando...')
        values.url = result; 
        postComunicado(values);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }

    },
  });
  

  return (

    <form className="row comunicado_docs" style={{ margin: '20px 50px 0 50px' }} noValidate onSubmitCapture={formik.handleSubmit}>
      <legend>COMUNICADOS</legend>
  
      
      <hr className="border border-primary border-2 opacity-50"></hr>
      {nombreUsuario && <span className='nombre_y_cargo'> <h3>Nombre:</h3> <h3>{nombreUsuario}</h3></span>}
      <div className="grid mx-auto p-5 comunicados__features">
        <input
          className="form-control form-control-lg"
          id="files_comunicado"
          name="files_comunicado"
          type="file"
          onChange={handleChange}
          
        />
        <div className="mb-3">
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder='Descripcion....' disabled={loading}
            {...formik.getFieldProps('descripcion')}
            required
          ></textarea>
        </div>

        <h2>Preview:</h2>
        {file && (
          <div className='documents'>

            {file.type.startsWith('image/') && <img src={preview} alt="preview" />}
            {file.type === 'application/pdf' && <embed src={preview} type="application/pdf" />}
            {file.type.startsWith('video/') && <video src={preview} controls />}
            {file.type.startsWith('audio/') && <audio src={preview} controls />}
            {(file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') && <iframe src={`https://view.officeapps.live.com/op/view.aspx?src=${preview}`} />}
            {/* Agrega aquí más previsualizaciones para otros tipos de archivos según sea necesario */}
          </div>
        )}
        <div style={{display:'flex', justifyContent:'space-evenly'}}>

        <CancelButton titulo='Cancelar' navigateTo='back'/>
        <button
          type="submit"
          className="btn btn-outline-success col-4 mt-4"
          disabled={loading}
        >
           {loading ? 'Cargando...' : 'Success'}
        </button> 
        </div>
       

      </div>
    </form>
  );
};

export default Comunicado;
