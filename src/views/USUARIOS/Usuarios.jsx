import React, { useEffect, useState } from 'react'
import DeleteButton from '../../components/BOTONES/Eliminar';
import UpdateButton from '../../components/BOTONES/Actualizar';
import IrButton from '../../components/BOTONES/Ir';
import { ApiRequests } from '../../api/ApiRequests';
import NewButton from '../../components/BOTONES/New';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Usuarios = () => {

  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [obtenerExito, setObtenerExito] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 4; // Define cuántos elementos quieres mostrar por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("/usuario");
        setData(response)
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
    setBorro(false);
  }, [, borro]);

  let results = [];

  !search ? results = data : results = data.filter((dato) => dato.nombre.toLowerCase().includes(search.toLocaleLowerCase()))

  const searcher = (e) => {
    setSearch(e.target.value);
  }
  // Cambia la página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Obtiene los elementos actuales a mostrar en la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const subirArchivos = (e) => {
    setObtenerExito(e);
  }
  const insertarArchivos = async (obtenerExito) => {
    if (!!!obtenerExito) {
      alert('Porfavor ingresar un documento excel')
      return;
    }
    console.log(obtenerExito)
    const formData = new FormData();
    formData.append('excel', obtenerExito); // Append the first file
    try {
      const response = await ApiRequests.postCommon("/usuario/multiRegistro", formData);
      console.log(response)
      setBorro(true)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="row" style={{ margin: '20px 50px 0 50px' }}>
      <legend>Usuarios</legend>
      <hr className="border border-primary border-2 opacity-50"></hr>
      <div className="grid gap-0 row-gap-3">
        <input className="form-control form-control-lg " id="excel" name='excel' type="file" onChange={(e) => {
          subirArchivos(e.target.files[0])
        }} />
        <button type="button" className="btn btn-outline-success" onClick={() => {
          insertarArchivos(obtenerExito)
        }} >Success</button>


      </div>

      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL USUARIO ....' />
      <table className="table text-start table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Rol</th>
            <td>
              Cambiar contraseña
            </td>
            <td>
              Enviar Comunicado
            </td>
          </tr>
        </thead>
        <tbody>

          {
            currentItems.map((Usuario) => (
              <tr key={Usuario.ci}>
                <td>{Usuario.nombre}</td>
                <td>{Usuario.apellidos}</td>
                <td>{Usuario.telefono}</td>
                <td>{Usuario.cargo}</td>
                <td>
                  <IrButton
                    navigateTo='/restablecerContraseña'
                    object={Usuario}
                    identificador="1"
                  />
                </td>
                <td>
                <IrButton
                    navigateTo='/comunicado'
                    object={Usuario}
                    identificador="1"
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
      <NewButton titulo='Nuevo Usuario' navigateTo='nuevoUsuario' />
    </div>
  );
}
export default Usuarios