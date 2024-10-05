import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react';
import { Alert } from '../Alerts/index';
import { useState } from 'react';
import axios from 'axios';


export const AgregarUsuario = () => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})
  const [telefonoN, setTelefonoN] = useState()
  const [password, setPassword] = useState('')
  const [imagen, setImagen] = useState('')
  
  const [type, setType] = useState('');
const handleChange = (event) => {
  setType(event.target.value);
};
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if ([type,nombre, apellido, email, telefonoN, password,imagen].includes('')) {
          setAlert({msg:"Todos los campos deben de ser llenados", error:true, isVisible:true})
          return;
      }
      const telefono= parseInt(telefonoN)
      
      try {
        const res = await axios.post(`http://localhost:3000/usuarios/add`,
         {type, nombre, apellido, email, telefono,password, imagen});
        setAlert({msg:"Datos cargados correctamente", error:false, isVisible:true})
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <form action="" className="ml-96  " onSubmit={handleSubmit}>
      <Alert  alert={alert}/>
    <h1 className="font-medium text-xl mt-10 mb-5 ml-3">Agregar Usuario</h1>
      <article className='flex p-3 gap-10 w-max'>
        <div className='flex flex-col gap-9'>
        <select name="Tipo de empleado" value={type} onChange={handleChange}>
    <option>Tipo de Empleado</option>
    <option value="Empleado">Empleado</option>
    <option value="Secretaria">Secretaria</option>
    <option value="Organizador">Organizador</option>
  </select>
        <label htmlFor="" className="font-medium">Nombre: </label>
        <label htmlFor="" className="font-medium">Apellidos: </label>
        <label htmlFor="" className="font-medium">Email: </label>
        <label htmlFor="" className="font-medium">Telefono</label>
        <label htmlFor="" className="font-medium">contraseña</label>
        <label htmlFor="" className='font-medium'>Imagen</label>
        </div>
        <div className='flex flex-col w-96 gap-4 mt-12'>
    <input 
    onChange={e=>setNombre(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={e=>setApellido(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={e=>setEmail(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={e=>setTelefonoN(e.target.value)}
    type="number" 
    className=' h-10 rounded-md border-2  mt-4' />
     <input 
    onChange={e=>setPassword(e.target.value)}
    type="text" 
    className=' h-10 rounded-md border-2' />
    <input 
    onChange={e=>setImagen(e.target.value)}
    type="text" 
     placeholder='Ingresa una URL'
     className=' h-10 rounded-md border-2 '
    />
        </div>
      </article>
      <Button
      type='submit'
      className='bg-slate-500 p-3 rounded-md text-white '>
      Guardar Cambios
      </Button>

      
    </form>
  )
}
