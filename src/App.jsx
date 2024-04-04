import { BrowserRouter, Route, Routes } from "react-router-dom"
import './app.css'
import Dashboard from "./views/DASHBOARD/dashboard"
import NotFound from "./components/NOTFOUND/notFound"
import AuthProvider from "react-auth-kit/AuthProvider"
import createStore from "react-auth-kit/createStore"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

import Consulta from "./views/CONSULTAS/Consulta"
import NuevaConsulta from "./views/CONSULTAS/NuevaConsulta"
import Servicio from "./views/SERVICIOS/Servicio"
import { NuevoServicio } from "./views/SERVICIOS/NuevoServicio"
import ActualizarServicio from "./views/SERVICIOS/ActualizarServicio"
import Doctores from "./views/DOCTORES/Doctores"
import NuevoDoctor from "./views/DOCTORES/NuevoDoctor"
import ActualizarDoctor from "./views/DOCTORES/ActualizarDoctor"
import Paciente from "./views/PACIENTES/Paciente"
import NuevoPaciente from "./views/PACIENTES/NuevoPaciente"
import ActualizarPaciente from "./views/PACIENTES/ActualizarPaciente"
import Tratamientos from "./views/TRATAMIENTOS/Tratamientos"
import NuevoTratamiento from "./views/TRATAMIENTOS/NuevoTratamiento"
import ActualizarTratamiento from "./views/TRATAMIENTOS/ActualizarTratamiento"
import MiCuenta from "./views/MI_CUENTA/Cuenta"
import CambiarPass from "./views/MI_CUENTA/CambiarPass"

import Historial from "./views/HISTORIAS_CLINICAS/Historial"
import NuevaHistoria from "./views/HISTORIAS_CLINICAS/NuevaHistoria"
import InformacionHistorial from "./views/HISTORIAS_CLINICAS/InformacionHistorial"

import ActualizarAntecedenteGinecologico from "./views/HISTORIAS_CLINICAS/ANTECEDENTES/ActualizarAGinecologico"
import ActualizarAntecedenteOdontologico from "./views/HISTORIAS_CLINICAS/ANTECEDENTES/ActualizarAOdontologico"
import ActualizarAntecedentePatologico from "./views/HISTORIAS_CLINICAS/ANTECEDENTES/ActualizarAPatologico"
import NuevoAntecedenteGinecologico from "./views/HISTORIAS_CLINICAS/ANTECEDENTES/NuevoAGinecologico"
import NuevoAntecedenteOdontologico from "./views/HISTORIAS_CLINICAS/ANTECEDENTES/NuevoAOdontologico"
import NuevoAntecedentePatologico from "./views/HISTORIAS_CLINICAS/ANTECEDENTES/NuevoAPatologico"

import Usuarios from "./views/USUARIOS/Usuarios"
import NuevoUsuario from "./views/USUARIOS/NuevoUsuario"
import RestablecerContraceña from "./views/USUARIOS/RestablecerContraseña"
import Login from "./views/login/login"




const role = sessionStorage.getItem('rolUsuario');/*----*/

const store = createStore({
  authName:'_auth',
  authType:'localstorage',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  
});
function App() {

return <>


    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
           <Route element={<AuthOutlet fallbackPath='/' />}> 
           <Route path="/dashboard" element={<Dashboard />} />
           </Route>
           <Route path="/usuarios" element={<Dashboard Contenido={<Usuarios/>}/>} />
           <Route path="/usuarios/nuevoUsuario" element={<Dashboard Contenido={<NuevoUsuario/>}/>} />
           <Route path="/usuarios/restablecerContraseña" element={<Dashboard Contenido={<RestablecerContraceña/>}/>} />
           
           <Route path="/estudiante" element={<Dashboard Contenido={<Paciente/>}/>} />
           <Route path="/estudiante/nuevoEstudiante" element={<Dashboard Contenido={<NuevoPaciente/>}/>} />
           <Route path="/estudiante/actualizarEstudiante" element={<Dashboard Contenido={<ActualizarPaciente/>}/>} />

           <Route path="/consulta" element={<Dashboard Contenido={<Consulta/>}/>} />
           <Route path="/consulta/nuevaConsulta" element={<Dashboard Contenido={<NuevaConsulta />}/>} />

           <Route path="/servicio" element={<Dashboard Contenido={<Servicio/>}/>} />
           <Route path="/servicio/nuevoServicio" element={<Dashboard Contenido={<NuevoServicio/>}/>} />
           <Route path="/servicio/actualizarServicio" element={<Dashboard Contenido={<ActualizarServicio/>}/>} />

           <Route path="/doctores" element={<Dashboard Contenido={<Doctores/>}/>} />
           <Route path="/doctores/nuevoDoctor" element={<Dashboard Contenido={<NuevoDoctor/>}/>} />
           <Route path="/doctores/actualizarDoctor" element={<Dashboard Contenido={<ActualizarDoctor/>}/>} />
           
           <Route path="/tratamientos" element={<Dashboard Contenido={<Tratamientos/>}/>} />
           <Route path="/tratamientos/nuevoTratamiento" element={<Dashboard Contenido={<NuevoTratamiento/>}/>} />
           <Route path="/tratamientos/actualizarTratamiento" element={<Dashboard Contenido={<ActualizarTratamiento/>}/>} />
          
           <Route path="/miCuenta" element={<Dashboard Contenido={<MiCuenta/>}/>} />
           <Route path="/miCuenta/cambiarPass" element={<Dashboard Contenido={<CambiarPass/>}/>} />
          
           <Route path="/historias" element={<Dashboard Contenido={<Historial/>}/>} />
           <Route path="/historias/nuevaHistoria" element={<Dashboard Contenido={<NuevaHistoria/>}/>} />
           <Route path="/historias/informacion" element={<Dashboard Contenido={<InformacionHistorial/>}/>} />
          
           <Route path="/historias/informacion/aaGinecologico" element={<Dashboard Contenido={<ActualizarAntecedenteGinecologico/>}/>} />
           <Route path="/historias/informacion/aaOdontologico" element={<Dashboard Contenido={<ActualizarAntecedenteOdontologico/>}/>} />
           <Route path="/historias/informacion/aaPatologico" element={<Dashboard Contenido={<ActualizarAntecedentePatologico/>}/>} />
           <Route path="/historias/informacion/naGinecologico" element={<Dashboard Contenido={<NuevoAntecedenteGinecologico/>}/>} />
           <Route path="/historias/informacion/naOdontologico" element={<Dashboard Contenido={<NuevoAntecedenteOdontologico/>}/>} />
           <Route path="/historias/informacion/naPatologico" element={<Dashboard Contenido={<NuevoAntecedentePatologico/>}/>} />
   
          
           <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
         
        </Routes>
      </BrowserRouter>

    </AuthProvider>

  </>
}

export default App
