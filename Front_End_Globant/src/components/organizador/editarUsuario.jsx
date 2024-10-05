import { Button } from '@material-tailwind/react';
import { Alert } from '../Alerts/index';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export const EditarUsuario = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})
    const [telefonoN, setTelefonoN] = useState()
    const {id}= useParams()
    
    const [type, setType] = useState('');
  const handleChange = (event) => {
    setType(event.target.value);
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if ([type,nombre, apellido, email, telefonoN].includes('')) {
            setAlert({msg:"there are empty fields", error:true, isVisible:true})
            return;
        }
        const telefono= parseInt(telefonoN)
        
        try {
          const res = await axios.patch(`http://localhost:3000/usuarios/editarUsuario/${id}`, {type, nombre, apellido, email, telefono });
          console.log(res.data);
          setAlert({msg:"Data changed successfully", error:false, isVisible:true})
        } catch (error) {
          console.error(error);
        }
      };
      
  return (
    <form action="" className="ml-96 " onSubmit={handleSubmit}>
        <Alert  alert={alert}/>
    <h1 className="font-medium text-xl mt-10 mb-5 ml-3">Editar Usuario</h1>
    <select name="Tipo de empleado" value={type} onChange={handleChange}>
    <option value="Empleado">Empleado</option>
    <option value="Secretaria">Secretaria</option>
  </select>
      <article className='flex p-3 gap-10 w-max'>
        <div className='flex flex-col gap-9'>
        <label htmlFor="" className="font-medium">Nombre: </label>
        <label htmlFor="" className="font-medium">Apellidos: </label>
        <label htmlFor="" className="font-medium">Email: </label>
        <label htmlFor="" className="font-medium">Telefono</label>
        </div>
        <div className='flex flex-col w-96 gap-4 '>
    <input 
    onChange={e=>setNombre(e.target.value)}
    value={nombre}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={e=>setApellido(e.target.value)}
    value={apellido}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={e=> setEmail(e.target.value)}
    value={email}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={e=> setTelefonoN(e.target.value)}
    value={telefonoN}
    type="number" 
    className=' h-10 rounded-md border-2 mb-10' />
        </div>
      </article>
      <Button
      type='submit'
      className='bg-slate-500 p-3 rounded-md text-white '
      >Guardar Cambios</Button>
    </form>
  )
}
