import React from 'react'

export const Profile = ({imagen, nombre, apellidos, email, telefono, type}) => {
  return (
    <article className='border p-5 '>
        <img src={imagen} alt="" className='rounded-full w-72 h-52' />
        <h1 className='font-bold text-xl text-center'>{nombre} {apellidos}</h1>
        <h1 className='font-bold text-2xl mt-12'>Informacion</h1>
        <h2 className='font-light text-lg mt-5'>Tipo Empleado</h2>
        <h2>{type}</h2>
        <h2 className='font-light text-lg mt-3'>Email</h2>
        <h2>{email}</h2>
        <h2 className='font-light text-lg mt-3'>Telefono</h2>
        <h2>{telefono}</h2>
    </article>
  )
}
