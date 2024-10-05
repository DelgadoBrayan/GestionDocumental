import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
export const DetalleUsuario = () => {
  const [data, setData] =useState([])
  const {id} = useParams()
  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/usuarios/delete/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const obtenerUsuario = async () => {
      const response = await axios.get(`http://localhost:3000/usuarios/getUserId/${id}`);
      setData(response.data);
    };
    obtenerUsuario();
  }, []);
  return (
    <article className='border flex flex-col justify-center items-center h-screen '>
      <h1 className='text-2xl font-medium mr-28 mb-5'>Detalles del Usuario</h1>
      <div className='flex flex-col gap-5 text-xl border p-3'>

      <h1>Tipo Empleado:  {data.type}</h1>
      <h1>Nombres: {data.nombre} {data.apellido}</h1>
      <h1>Correo: {data.email}</h1>
      <h1>Telefono: {data.telefono}</h1>
      <div className='flex justify-between'>
        <Link 
        to={`/editarUsuario/${data._id}`}
        className='w-24 bg-sky-400 p-2 pl-5 rounded-md text-white hover:bg-sky-700'>
        Editar
        </Link>
        <button 
        onClick={handleDelete}
        className='bg-red-500 p-2 rounded-md text-white hover:bg-red-700'>
        Eliminar
        </button>
      </div>
      </div>
    </article>
  )
}
