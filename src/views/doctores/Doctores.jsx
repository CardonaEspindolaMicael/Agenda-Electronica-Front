import React, { useEffect, useState } from 'react';
import { ApiRequests } from '../../api/ApiRequests';
import DeleteButton from '../../components/BOTONES/Eliminar';
import NewButton from '../../components/BOTONES/New';
import UpdateButton from '../../components/BOTONES/Actualizar';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Doctores = () => {
  const [data, setData] = useState([]);
  const [borro, setBorro] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
  const itemsPerPage = 5; // Define cuántos elementos quieres mostrar por página
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ApiRequests.getCommon("api/Doctores");
        const doctorData = await Promise.all(response.map(async doctor => {
          const sucursalResponse = await ApiRequests.getCommon(`api/Sucursales/${doctor.idSucursal}`);
          return { ...doctor, sucursal: sucursalResponse };
        }));
        setData(doctorData);
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
      <legend>Doctores</legend>
      <hr class="border border-primary border-2 opacity-50"></hr>
      <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL DOCTOR ....' />
      <table className="table text-start table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Número Celular</th>
            <th>Especialidad</th>
            <th>Sucursal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((doctor) => (
              <tr className='subCuerpoPaciente' key={doctor.id}>
                <td>{doctor.documentoIdentidad}</td>
                <td>{doctor.nombre}</td>
                <td>{doctor.apellidos}</td>
                <td>{doctor.numeroCelular}</td>
                <td>{doctor.especialidad}</td>
                <td>{(doctor.sucursal).nombre}</td>
                <td>
                  <UpdateButton
                    titulo='Actualizar'
                    navigateTo='actualizarDoctor'
                    object={doctor}
                    identificador={doctor.id}
                  />
                  <DeleteButton
                    titulo='Eliminar'
                    identificador={doctor.id}
                    elimino={setBorro}
                    endpoint='api/Doctores/Delete'
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
      <NewButton titulo='Nuevo Doctor' navigateTo='nuevoDoctor' />
    </div>
  );
}
export default Doctores