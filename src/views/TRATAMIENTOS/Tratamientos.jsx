import React, { useEffect, useState } from 'react';
import { ApiRequests } from '../../api/ApiRequests';
import DeleteButton from '../../components/BOTONES/Eliminar';
import NewButton from '../../components/BOTONES/New';
import UpdateButton from '../../components/BOTONES/Actualizar';
import SearchFilter from '../../components/OTHER/SearchFilter';
import Pagination from '../../components/OTHER/Pagination';

const Tratamientos = () => {
    const [data, setData] = useState([]);
    const [borro, setBorro] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Añade un estado para la página actual
    const itemsPerPage = 5; // Define cuántos elementos quieres mostrar por página
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ApiRequests.getCommon("api/Tratamientos");

                const tratamientosData = await Promise.all(response.map(async tratamiento => {
                    const servicioResponse = await ApiRequests.getCommon(`api/Servicios/${tratamiento.idServicio}`);
                    return { ...tratamiento, servicio: servicioResponse }
                }));
                setData(tratamientosData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
        setBorro(false);
    }, [, borro]);

    let results = [];

    !search ? results = data : results = data.filter((dato) => dato.descripcion.toLowerCase().includes(search.toLocaleLowerCase()))


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
            <legend>Tratamientos</legend>
            <hr class="border border-primary border-2 opacity-50"></hr>
            <SearchFilter value={search} onChange={searcher} placeholder='INGRESE EL NOMBRE DEL TRATAMIENTO ....' />

            <table className="table text-start table-dark table-hover mt-3">
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Servicio</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentItems.map((tratamiento) => (
                            <tr  key={tratamiento.id}>
                                <td>{tratamiento.descripcion}</td>
                                <td>{tratamiento.precio}</td>
                                <td>{(tratamiento.servicio).nombre}</td>
                                <td>
                                    <UpdateButton
                                        titulo='Actualizar'
                                        navigateTo='actualizarTratamiento'
                                        object={tratamiento}
                                        identificador={tratamiento.id}
                                         />

                                    <DeleteButton
                                        titulo='Eliminar'
                                        identificador={tratamiento.id}
                                        elimino={setBorro}
                                        endpoint='api/Tratamientos/Delete' />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Pagination itemsPerPage={itemsPerPage} totalItems={results.length} paginate={paginate} />
            <NewButton titulo='Nuevo Tratamiento' navigateTo='NuevoTratamiento' />
        </div>
    );
};
export default Tratamientos;
