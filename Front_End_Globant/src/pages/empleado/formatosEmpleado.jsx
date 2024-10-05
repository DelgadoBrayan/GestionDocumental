import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { SideBarEmpleado } from '../../components/sideBarEmpleado'
import { Profile } from '../../components/profile/profile'
import { CardFormatoEmp } from '../../components/empleado/cardFormatoEmp'
import Cookies from 'js-cookie'
export const FormatosEmpleado = () => {
    const [data, setData] =useState([])
    const id = localStorage.getItem('ID').replace(/"/g, '');
    const token = Cookies.get('ID')
    
    useEffect(() => {
      const obtenerUsuarios = async () => {
        const response = await axios.get('http://localhost:3000/usuarios/getUser',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
        setData(response.data);
      };
      obtenerUsuarios();
    }, []);
  return (
    <article className='flex justify-between gap-16'>
    <SideBarEmpleado/>
  <section className='mt-5 w-full'>
          <CardFormatoEmp/>
         
      </section>
      <Profile 
  imagen={data.imagen}
  nombre={data.nombre}
  apellidos={data.apellido}
  email={data.email}
  telefono={data.telefono}
  type={data.type}
  />
  </article>
  )
}
