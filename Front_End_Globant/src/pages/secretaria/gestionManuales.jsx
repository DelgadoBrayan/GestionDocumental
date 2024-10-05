
import React,{useState, useEffect} from 'react'
// import CardManuales from '../../components/secretaria/cardManuales'
import { NavBarSecretaria } from '../../components/navBarSecretaria'
import axios from 'axios'
import { Profile } from "../../components/profile/profile";
import CardManuales from '../../components/manuales/cardManuales';
import Cookies from 'js-cookie';
export const GestionManuales = () => {
  const [data, setData] =useState([])
  const id = localStorage.getItem('ID').replace(/"/g, '');
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
        <NavBarSecretaria/>
        <section className='mt-5 w-full'>
           <CardManuales />
            
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
