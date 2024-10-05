import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import { CardInformeE } from '../../components/empleado/cardInformeE'
import axios from 'axios'
import { SideBarEmpleado } from '../../components/sideBarEmpleado'
import { Profile } from '../../components/profile/profile'
import Cookies from 'js-cookie'
import { CardInformeE } from '../../components/informeEmpleado/cardInformeE'

export const InformesEmpleado = () => {
  const [data, setData] =useState([])
  const token = Cookies.get('ID');
 
  useEffect(() => {
    
  const obtenerUsuario= async()=>{
    try { 
     const reponse = await axios.get('http://localhost:3000/usuarios/getUser',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      setData(reponse.data)
    } catch (error) {
      console.log(error)
    }

  }
  obtenerUsuario()  
  }, [])
  
  const informes = [
    {
      nombre:"juan ramirez",
      titulo:"informe avance proyecto ruleta magica",
      estado:"revisado",
      fecha_creacion:'22/05/2323',
      fecha_actualizacion: 'actualizacion',
      descripcion:"hola mmundidhs bc dbjbbchcchcdhchccjbhcc"
    },
    {
      nombre:"juan ramirez",
      titulo:"informe avance proyecto ruleta magica",
      estado:"revisado",
      fecha_creacion:'22/05/2323',
      fecha_actualizacion: 'actualizacion',
      descripcion:"hola mmundidhs bc dbjbbchcchcdhchccjbhcc"
    },
    {
      nombre:"juan ramirez",
      titulo:"informe avance proyecto ruleta magica",
      estado:"revisado",
      fecha_creacion:'22/05/2323',
      fecha_actualizacion: 'actualizacion',
      descripcion:"hola mmundidhs bc dbjbbchcchcdhchccjbhcc"
    }
  
  ]


  return (
    <article className='flex justify-between gap-16'>
      <SideBarEmpleado/>
    <section className='mt-5 w-full'>
           <CardInformeE/>
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
