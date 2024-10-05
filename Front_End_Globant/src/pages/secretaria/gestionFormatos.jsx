
import React,{useState, useEffect} from 'react'
import { NavBarSecretaria } from '../../components/navBarSecretaria'
import axios from 'axios'
import { Profile } from "../../components/profile/profile";
import Cookies from 'js-cookie';
import { CardFormatos } from '../../components/formatos/cardFormatos';
export const GestionFormatos = () => {
  const [data, setData] =useState([])
  const token = Cookies.get('ID');
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const reponse = await axios.get('http://localhost:3000/usuarios/getUser',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
   
      )
      setData(reponse.data)
    };
    obtenerUsuarios();
  }, []);
  return (
    <article className='flex justify-between gap-16'>
    <NavBarSecretaria/>
    <section className='mt-5 w-full'>
      <CardFormatos/>
      
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