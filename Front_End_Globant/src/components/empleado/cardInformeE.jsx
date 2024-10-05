import {
  Button,
  Input,
} from "@material-tailwind/react";
import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
export const CardInformeE = () => {
  const [data, setData] =useState(null)
  const [searchReporte, setSearchReporte] = useState('')
  const [reporte, setReporte] = useState(null)
  const [informeNoEncontrado, setInformeNoEncontrado] = useState('')
  useEffect(() => {
    const obtenerReportes= async ()=>{
      const response = await axios('http://localhost:3000/reportes/leerReportes')
      setData(response.data)
    }
    obtenerReportes()
  }, [])
  const handleSubmit =(event)=>{
    event.preventDefault();
    const dataReporteEncontrado = data.filter(
      (reporteEncontrado)=> reporteEncontrado.titulo == searchReporte
    );
  setManual(dataReporteEncontrado)
  if(dataReporteEncontrado.length == 0){
    setManulaNoEntotrado("El Reporte no se encuentra en la base de datos")
  }
  }
  return (
   <section>
     <form className="flex gap-5" action="" onSubmit={handleSubmit}>
          <Input
            value={searchReporte}
            type="search"
            id="search"
            name="search"
            placeholder="Search"
            className=" border-black  pl-9 placeholder:text-black focus:border-green-800 w-96  h-10 float-right rounded-md "
            onChange={e => setSearchReporte(e.target.value)}
          />
          <Button
            className="bg-black p-3 "
            type="submit">
            Buscar
          </Button>
        </form>
        <h1 className="font-semibold text-xl mt-4">Reportes</h1>
        <div className='flex gap-5 place-content-evenly mt-10 flex-wrap'>

    {informeNoEncontrado? <div className="text-center"> <h1 className="text-2xl font-bold mb-10">{informeNoEncontrado}</h1>
          <Link 
          className="bg-slate-900 text-white p-2 rounded-md" 
          to={'/secretaria'}
          >Regresar</Link> </div>
    
    :reporte ? reporte && reporte.map((reporte)=>(
      <article className='border-2 w-max p-6 ' key={reporte._id}>
      <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Nombre del empleado:</p>{reporte.nombre_empleado}</h1>
      <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p>{reporte.titulo}</h1>
      <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Estado:</p>{reporte.estado}</h1>
      <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Fecha de creacion:</p>{reporte.fecha_creacion}</h1>
      <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Fecha de Actualizacion:</p>{reporte.fecha_actualizacion}</h1>
      <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{reporte.descripcion}</h1>
          <div className='flex gap-24'>
          <Link
               className='mt-4 text-cyan-600 font-medium'
               to={`http://localhost:3000/manuales/${reporte.archivo}`}>
               {reporte.archivo}
          </Link>
      </div>
  </article>
    )): data && data.map((reporte)=>(
      <article className='border-2 w-max p-6 ' key={reporte._id}>
    <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Nombre del empleado:</p>{reporte.nombre_empleado}</h1>
    <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p>{reporte.titulo}</h1>
    <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Estado:</p>{reporte.estado}</h1>
    <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Fecha de creacion:</p>{reporte.fecha_creacion}</h1>
    <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Fecha de Actualizacion:</p>{reporte.fecha_actualizacion}</h1>
    <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{reporte.descripcion}</h1>
        <div className='flex gap-24'>
        <Link
               className='mt-4 text-cyan-600 font-medium'
               to={`http://localhost:3000/reportes/${reporte.archivo}`}>
               {reporte.archivo}
             </Link>
    </div>
</article>
      ))}
      </div>
      </section>
  )
}
