import React, { useEffect, useState } from 'react'
import { ApiRequests } from '../../api/ApiRequests';
import NewButton from '../../components/BOTONES/New';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Consulta = () => {
  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 5; // Define cuántos elementos quieres mostrar por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("api/Consultas");
        setData(response)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
    setBorro(false);
  }, [, borro]);


  let results = [];

  !search ? results = data : results = data.filter((dato) => dato.paciente.toLowerCase().includes(search.toLocaleLowerCase()))

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
      <legend>Consultas</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL PACIENTE ....' />

      <table className="table text-start table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha Consulta</th>
            <th>Diagnostico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((consulta) => (
              <tr key={consulta.id}>
                <td>{consulta.paciente}</td>
                <td>{consulta.fechaConsulta}</td>
                <td>{consulta.diagnostico}</td>
                <td>
                  <button type="submit" className="btn btn-secondary">Ir Proforma</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
      <NewButton titulo='Nueva Consulta' navigateTo='nuevaConsulta' />
    </div>
  );
}
export default Consulta;