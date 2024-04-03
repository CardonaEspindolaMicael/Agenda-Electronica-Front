import React, { useEffect, useState } from 'react'
import DeleteButton from '../../components/BOTONES/Eliminar';
import UpdateButton from '../../components/BOTONES/Actualizar';
import { ApiRequests } from '../../api/ApiRequests';
import NewButton from '../../components/BOTONES/New';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Paciente = () => {
  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 5; // Define cuántos elementos quieres mostrar por página
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("api/Pacientes");
        setData(response)
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
    console.log(e.target.value)
  }
  // Cambia la página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Obtiene los elementos actuales a mostrar en la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="row" style={{ margin: '20px 50px 0 50px' }}>
      <legend>Pacientes</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL PACIENTE ....' />

      <table className="table table-dark text-start table-hover mt-3 ">
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Dirección</th>
            <th>Número Celular</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.documentoIdentidad}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellidos}</td>
                <td>{paciente.edad}</td>
                <td>{paciente.direccion}</td>
                <td>{paciente.numeroCelular}</td>
                <td>{paciente.correo}</td>
                <td>
                  <UpdateButton
                    titulo='Actualizar'
                    navigateTo='actualizarPaciente'
                    object={paciente}
                    identificador={paciente.id}
                  />
                  <DeleteButton
                    titulo='Eliminar'
                    identificador={paciente.id}
                    elimino={setBorro}
                    endpoint='api/Pacientes/Delete'
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
      <NewButton titulo='Nuevo Paciente' navigateTo='nuevoPaciente' />
    </div>
  );
};
export default Paciente;
