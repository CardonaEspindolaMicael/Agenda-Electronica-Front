import React, { useEffect, useState } from 'react'
import DeleteButton from '../../components/BOTONES/Eliminar';
import UpdateButton from '../../components/BOTONES/Actualizar';
import IrButton from '../../components/BOTONES/Ir';
import { ApiRequests } from '../../api/ApiRequests';
import NewButton from '../../components/BOTONES/New';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Historial = () => {

  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 5; // Define cuántos elementos quieres mostrar por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("api/HistorialesClinicas");
        setData(response)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
    setBorro(false);
  }, [, borro]);

  let results = [];

  !search ? results = data : results = data.filter((dato) => dato.nombrePaciente.toLowerCase().includes(search.toLocaleLowerCase()))

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
      <legend>Historiales Clinicas</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL PACIENTE ....' />
      <table className="table text-start table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Doctor</th>
            <th>CI Doctor</th>
            <th>Paciente</th>
            <th>CI Paciente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            currentItems.map((Historial) => (
              <tr key={Historial.id}>
                <td>{Historial.codigo}</td>
                <td>{Historial.ciDoctor}</td>
                <td>{Historial.nombreDoctor}</td>
                <td>{Historial.ciPaciente}</td>
                <td>{Historial.nombrePaciente}</td>
                <td>
                  <IrButton 
                    navigateTo='informacion'
                    object={Historial}
                    identificador={Historial.id}
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
      <NewButton titulo='Nuevo Historial' navigateTo='nuevaHistoria' />
    </div>
  );
}
export default Historial