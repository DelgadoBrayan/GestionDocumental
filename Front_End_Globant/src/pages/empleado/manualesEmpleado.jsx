import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import { CardInformeE } from '../../components/empleado/cardInformeE'
import axios from 'axios'
import { SideBarEmpleado } from '../../components/sideBarEmpleado'
import { Profile } from '../../components/profile/profile'
import { CardManualesEmp } from '../../components/empleado/cardManualesEmp'
import Cookies from 'js-cookie'
export const ManualesEmpleado = () => {
    const [data, setData] =useState([])
    const token = Cookies.get('ID');
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
          <CardManualesEmp/>
         
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
