import React, { useEffect, useState } from 'react'
import DeleteButton from '../../components/BOTONES/Eliminar';
import UpdateButton from '../../components/BOTONES/Actualizar';
import { ApiRequests } from '../../api/ApiRequests';
import NewButton from '../../components/BOTONES/New';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Servicio = () => {

  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 5; // Define cuántos elementos quieres mostrar por página

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("api/Servicios");
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
      <legend>Servicios</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL SERVICIO ....' />
      <table className="table text-start table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            currentItems.map((Servicio) => (
              <tr key={Servicio.id}>
                <td>{Servicio.nombre}</td>
                <td>{Servicio.descripcion}</td>
                <td>
                  <UpdateButton
                    titulo='Actualizar'
                    navigateTo='actualizarServicio'
                    object={Servicio}
                    identificador={Servicio.id}
                  />
                  <DeleteButton
                    titulo='Eliminar'
                    identificador={Servicio.id}
                    elimino={setBorro}
                    endpoint='api/Servicios/Delete'
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
      <NewButton titulo='Nuevo Servicio' navigateTo='nuevoServicio' />
    </div>
  );
}
export default Servicio