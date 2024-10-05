
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { GestionReportes } from './pages/organizador/gestionReportes'
import { GestionUsuarios } from './pages/organizador/gestionUsuarios'
import { Error404 } from './pages/notFound/notFound'
import { AgregarInforme } from './components/organizador/agregarInforme'
import { GestionManuales } from './pages/secretaria/gestionManuales'
import { AgregarManuales } from './components/secretaria/agregarManuales'
import { GestionFormatos } from './pages/secretaria/gestionFormatos'
import { AgregarFormatos } from './components/secretaria/agregarFormatos'
import { InformesEmpleado } from './pages/empleado/imformesEmpleado'
import { AgreagarInformeE } from './components/empleado/agreagarInformeE'
import { SingIn } from './pages/SingIn/singIn'
import { DetalleUsuario } from './components/organizador/detalleUsuario'
import { EditarUsuario } from './components/organizador/editarUsuario'
import { AgregarUsuario } from './components/organizador/agregarUsuario'
import { DashBoard } from './pages/DashBoard/dash'
import { FormatosEmpleado } from './pages/empleado/formatosEmpleado'
import { ManualesEmpleado } from './pages/empleado/manualesEmpleado'
import { ActualizarManual } from './components/secretaria/actualizarManual'
import { ActualizarFormato } from './components/secretaria/actualizarFormato'
import { ActualizarInformeE } from './components/empleado/actualizarInformeE'
import { ActualizarInforme } from './components/organizador/actualizarInforme'
function App() {
const AppRouter = ()=>{
  let routes = useRoutes([
    { path: "/", element:<DashBoard/>},
    { path: "*", element: <Error404/> },
    { path: "/singIn", element:<SingIn/>},
    { path: "/organizador", element: <GestionReportes/>},
    { path: "/secretaria", element: <GestionManuales/>},
    { path: "/empleado", element: <InformesEmpleado/>},
    { path: "/gestionformatos", element: <GestionFormatos/>},
    { path: "/gestionusuarios", element: <GestionUsuarios/>},
    { path: "/agregarUsuario", element: < AgregarUsuario/>},
    { path: "/gestionusuarios/:id", element: <DetalleUsuario/>},
    { path: "/editarUsuario/:id", element: <EditarUsuario/>},
    { path: "/agregarinforme", element: <AgregarInforme/>},
    { path: "/agregarformatos", element:<AgregarFormatos/>},
    { path: "/agregarmanual", element: <AgregarManuales/>},
    { path: "/actualizarManual/:id", element: <ActualizarManual/>},
    { path: "/actualizarformato/:id", element: <ActualizarFormato/>},
    { path: "/actualizarreporte/:id", element: <ActualizarInformeE/>},
    {path: "/actualizarinforme/:id", element:  <ActualizarInforme/>}, 
    { path: "/agregarformatoempleado", element: <AgreagarInformeE/>},
    { path: "/formatosempleado", element: <FormatosEmpleado/>},
    { path: "/manualesempleado", element: <ManualesEmpleado/>}
  ])
  return routes
}

  return (
  <BrowserRouter>
  <AppRouter/>
  </BrowserRouter>
  )
}

export default App
