import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../../components/navBar'
import axios from 'axios'
export const GestionUsuarios = () => {
  const [data, setData] =useState([])
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get(`http://localhost:3000/usuarios/getUsers`);
      setData(response.data);
    };
    obtenerUsuarios();
  }, []);
  const empleadosFiltrados = data.filter(
    (trabajador) => trabajador.type === "Empleado"
  );
  const secretariasFiltradas = data.filter(
    (trabajador) => trabajador.type === "Secretaria"
  );

  return (
    <section className="">
      <NavBar/>
      <br/>
      <Link to='/agregarUsuario' className='ml-5 mt-10 p-3 bg-slate-500 text-white font-medium rounded-lg'>Agregar Usuario</Link>
     <div className='flex justify-evenly mt-10 gap-20 '>
    <h1 className='text-2xl font-medium'>Secretaria</h1>
    <h1 className='text-2xl font-medium'>Empleado</h1>
     </div>
     <div className='flex  justify-evenly'>
     <article className='flex flex-col-reverse'>
     {secretariasFiltradas.map((secretaria) => (
       <Link 
       to={`/gestionusuarios/${secretaria._id}`}
       key={secretaria._id} 
       className='text-lg p-3 hover:scale-110 cursor-pointer'>
       {secretaria.nombre}
       {secretaria.apellido}
       </Link>
       ))}
     </article>
     <article className='flex flex-col-reverse'>
       {empleadosFiltrados.map((empleado) => (
          <Link 
          to={`/gestionusuarios/${empleado._id}`}
          key={empleado._id}
          className='text-lg pl-24 p-3 hover:scale-110 cursor-pointer'>
          {empleado.nombre} 
          {empleado.apellido}
          </Link>
        ))}
     </article>
     </div>
  </section>
  )
}
