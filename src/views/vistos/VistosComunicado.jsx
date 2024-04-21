import React, { useEffect, useState } from 'react'
import { ApiRequests } from '../../api/ApiRequests';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const VistosComunicado = () => {

  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 9; // Define cuántos elementos quieres mostrar por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("/comunicado/obtenerVistos");
        setData(response)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
    setBorro(false);
  }, [, borro]);

  let results = [];

  !search ? results = data : results = data.filter((dato) => dato.ci_usuario.toLowerCase().includes(search.toLocaleLowerCase()))

  const searcher = (e) => {
    setSearch(e.target.value);
  }
  // Cambia la página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Obtiene los elementos actuales a mostrar en la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <div className="row" style={{ margin: '20px 50px 0 50px' }}>
      <legend>Comunicados Vistos</legend>
      <hr className="border border-primary border-2 opacity-50"></hr>
      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL CI DEL USUARIO ....' />
      <table className="table text-start table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Fecha</th>
            <th>visto</th>
          </tr>
        </thead>
        <tbody>

          {
            currentItems.map((Usuario) => (
              <tr key={Usuario.id}>
                <td>{Usuario.ci_usuario}</td>
                <td>{Usuario.nombre}</td>
                <td>{Usuario.apellidos}</td>
                <td>{(Usuario.fecha).toString().split('T')[0]}</td>
                <td>{(Usuario.visto).toString()}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
    </div>
  );
}
export default VistosComunicado