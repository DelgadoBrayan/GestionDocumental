import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
export const DashBoard = () => {
  return (
    <>
   <article className=''>
    <h1></h1>
    <nav className='flex justify-between items-center pl-10 pr-10'>
        <img src="src/assets/logo.svg" alt=""  className=' w-32'/>
        <Link className='text-2xl font-bold  h-max p-3 rounded-lg' to='/singIn'>Inicio Sesion</Link>
    </nav>
    <section className='flex gap-50'>
        <p className='titulo1 w-96 font-semibold transform text-xl'>
        En GLOBANT cada proyecto es un viaje hacia la innovación y la excelencia.
        Nuestro compromiso con la calidad y la vanguardia tecnológica nos impulsa a superar los
        límites de lo posible, transformando las ideas más audaces en software
        que marca la diferencia.
        </p>
        <img src="src/assets/MaskGroup.png" alt="" className='' />
    </section>
   </article>
   <article className='mb-20'>
    <section className='flex'>
    <img src="src/assets/globantX-BG.png" alt="" />
    <p className='titulo2 w-96 font-semibold text-xl'>
    Aquí, en el centro neurálgico de nuestra creatividad, encontrarás las herramientas
    y la información necesaria para llevar tus habilidades al siguiente nivel. Desde
    el seguimiento de proyectos hasta recursos de aprendizaje, este espacio está
    diseñado para fomentar la colaboración, la inspiración y el crecimiento continuo.
    </p>
    </section>
   </article>
   <article className='flex justify-evenly mb-60'>
    <div className='w-80 h-max p-5 border-2 rounded-md hover:scale-105 mt-16'>
    <h1 className=' text-center mb-1 bg-gradient-to-l from-lime-100 via-lime-900 to-lime-500 bg-clip-text text-transparent text-3xl'>Innovacion</h1> 
        <p className='text-center'>
        Aquí encontrarás las últimas tendencias en desarrollo de software,
        inteligencia artificial y más, junto con oportunidades para
        contribuir a proyectos pioneros que están redefiniendo lo que es posible.
        </p>
    </div>
    <div className='w-80 p-5 border-2 rounded-md hover:scale-110 h-max'>
    <h1 className='mb-4 bg-gradient-to-l from-lime-100 via-lime-900 to-lime-500 bg-clip-text text-transparent text-3xl'>Proyectos</h1> 
        <p className='text-center'>
        Nuestros proyectos son el reflejo de nuestra pasión por crear un impacto
        significativo. Desde aplicaciones móviles revolucionarias hasta soluciones 
        empresariales
        </p>
    </div>
    <div className='w-80 border-2 p-5 rounded-md hover:scale-105 mt-16'>
    <h1 className='mb-4 bg-gradient-to-l from-lime-100 via-lime-900 to-lime-500 bg-clip-text text-transparent text-3xl'>Aprendizaje</h1> 
        <p className='text-center'>
        El crecimiento personal y profesional es fundamental en Globant. 
        Por eso, ofrecemos una amplia gama de recursos para tu desarrollo, incluyendo 
        cursos especializados, talleres prácticos y sesiones de mentoría.
        </p>
    </div>
   </article>
    </>
  )
}
