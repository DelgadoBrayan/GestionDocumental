import { Button } from '@material-tailwind/react'
import React,{useEffect,useState} from 'react'
// import { CardInfromes } from '../../components/organizador/cardInfromes'
import { Link } from 'react-router-dom'
import { NavBar } from '../../components/navBar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { CardInfromes } from '../../components/informesOrganizador/cardInfromes'
export const GestionReportes = () => {
  const [data, setData] =useState([])
  
  const token = Cookies.get('ID')
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get(`http://localhost:3000/usuarios/getUser`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    };
    obtenerUsuarios();
  }, []);
  return (
    <article className=''>
      <NavBar/>
      <h1 className='mb-5 text-2xl font-semibold ml-5'>Bienvenido {data.nombre} {data.apellido}</h1>
      <Link to='/agregarinforme' className='ml-5 mt-10 p-3 bg-slate-500 text-white font-medium rounded-lg'>Agregar Infome</Link>
        <section className='flex gap-5 place-content-evenly mt-5 flex-wrap'>
           <CardInfromes/>
          
        </section>
    </article>
  )
}
