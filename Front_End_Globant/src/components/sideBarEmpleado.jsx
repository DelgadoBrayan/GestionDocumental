import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const SideBarEmpleado = () => {
    const [ruta, setRuta] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    switch (ruta) {
      case 'mirarReporte':
        navigate('/empleado')
        break
      case 'agregarReporte':
        navigate('/agregarformatoempleado')
        break;
      case 'mirarManual':
        navigate('/manualesempleado');
        break;
      case 'mirarFormato':
        navigate('/formatosempleado');
        break;
      default:
        // Manejar ruta por defecto o mostrar un error
    }
  }, [ruta]);

  const handleChange = (event) => {
    setRuta(event.target.value);
  };
    return (
      <ul className="border w-max h-screen">
      <img className="w-56 h-24" src="src/assets/logo.svg" alt="" />
      <h1 className="font-bold text-xl ml-10 mb-3">Reportes</h1>
      <select name="Reportes" className="ml-10" value={ruta} onChange={handleChange}>
        <option value="">selecciona una opcion</option>
        <option value="mirarReporte">Mirar Reportes</option>
        <option value="agregarReporte">Agregar Reporte</option>
      </select>
      <h1 className="font-bold text-xl ml-10 mb-3 mt-12">Manuales</h1>
      <select name="manuales" className="ml-10" value={ruta} onChange={handleChange}>
        <option value="">selecciona una opcion</option>
        <option value="mirarManual">Mirar Manuales</option>
      </select>
      <br />
      <h1 className="font-bold text-xl ml-10 mb-3 mt-12">Formatos</h1>
      <select name="formatos" className="ml-10" value={ruta} onChange={handleChange}>
        <option value="">selecciona una opcion</option>
        <option value="mirarFormato">Mirar Formato</option>
      </select>
    </ul>
    );
}