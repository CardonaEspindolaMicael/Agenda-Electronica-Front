import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import NewButton from '../../components/BOTONES/New';

const MiCuenta = () => {
    const [userData, setUserData] = useState({
        idUsuario: '',
        rolUsuario: '',
        idNombre: '',
    });

    useEffect(() => {
        // Retrieve data from sessionStorage
        const idUsuario = sessionStorage.getItem('idUsuario');
        const rolUsuario = sessionStorage.getItem('rolUsuario');
        const idNombre = sessionStorage.getItem('idNombre');

        // Update state with retrieved data
        setUserData({
            idUsuario,
            rolUsuario,
            idNombre,
        });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // The rest of your component code remains unchanged
    const formik = useFormik({
        initialValues: {
            // Define your form fields here
        },
        onSubmit: (values) => {
            // Handle form submission
        },
    });

    return (
        <div style={{ margin: '20px 50px 0 50px' }}>
            <legend>Mi cuenta</legend>
            <hr class="border border-primary border-2 opacity-50"></hr>

            <div className="card bg-secondary text-light mb-3">
                <div className="card-header">
                    <h5 className="card-title">Detalles de la cuenta</h5>
                </div>
                <div className="card-body">
                    <div>
                        <p>Nombre: {userData.idNombre}</p>
                        <p>Cedula de Identidad: {userData.idUsuario}</p>
                        <p>Rol Usuario: {userData.rolUsuario}</p>
                    </div>
                </div>
            </div>
            <NewButton titulo='Cambiar Contraceña' navigateTo='cambiarPass'/>
        </div>
    );
};

export default MiCuenta;
