import {
  Button,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function CardManuales() {
  const [data, setData] = useState(null)
  const [searchManual, setSearchManual] = useState('')
  const [manual, setManual] = useState(null)
  const [manulaNoEntotrado, setManulaNoEntotrado] = useState('')
  useEffect(() => {
    const obtenerUsuario = async () => {
      const response = await axios.get(`http://localhost:3000/manuales/leerManuales`);
      setData(response.data);
    };
    obtenerUsuario();
  }, []);
  const handleSubmit =(event)=>{
    event.preventDefault();
    const dataManualEncontrado = data.filter(
      (manualEncontrado)=> manualEncontrado.titulo == searchManual
    );
  setManual(dataManualEncontrado)
  if(dataManualEncontrado.length == 0){
    setManulaNoEntotrado("El Manual no se encuentra en la base de datos")
  }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/manuales/borrarManual/${id}`);
      console.log("borrado correctamenete")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section>
        <form className="flex gap-5" action="" onSubmit={handleSubmit}>
        <Input
          value={searchManual}
          type="search"
          id="search"
          name="search"
          placeholder="Search"
          className=" border-black  pl-9 placeholder:text-black focus:border-green-800 w-96  h-10 float-right rounded-md "
          onChange={e=> setSearchManual(e.target.value)}
          />
          <Button 
          className="bg-black p-3 " 
          type="submit">
          Buscar
          </Button>
          </form>
        <h1 className="font-semibold text-xl mt-4">Manuales</h1>
        <div className='flex gap-5 place-content-evenly mt-10 flex-wrap'>

          {manulaNoEntotrado? <div className="text-center"> <h1 className="text-2xl font-bold mb-10">{manulaNoEntotrado}</h1>
          <Link 
          className="bg-slate-900 text-white p-2 rounded-md" 
          to={'/secretaria'}
          >Regresar</Link> </div>
          :
          manual ? manual.map((manualEncontrado)=>(
            <article className='border-2 w-max p-6 ' key={manualEncontrado._id}>
           <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p>{manualEncontrado.titulo}</h1>
           <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Tipo:</p>{manualEncontrado.tipo}</h1>
           <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{manualEncontrado.descripcion}</h1>
           <h1 className='flex'><p className='font-medium text-lg'>Fecha de Creacion:</p>{manualEncontrado.fecha_creacion}</h1>
           <h1 className='flex'><p className='font-medium text-lg'>Autor:</p>{manualEncontrado.autor}</h1>
           <div className='flex gap-24'>
             <Link
               className='mt-4 text-cyan-600 font-medium'
               to={`http://localhost:3000/manuales/${manualEncontrado.archivo}`}>
               {manualEncontrado.archivo}
             </Link>
           </div>
         </article> 
           ))
         :
          data && data.map((manual) => (
            <article className='border-2 w-max p-6 ' key={manual._id}>
              <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p>{manual.titulo}</h1>
              <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Tipo:</p>{manual.tipo}</h1>
              <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{manual.descripcion}</h1>
              <h1 className='flex'><p className='font-medium text-lg'>Fecha de Creacion:</p>{manual.fecha_creacion}</h1>

              <div className='flex gap-5'>
                <Link
                  className='mt-4 text-cyan-600 font-medium'
                  to={`http://localhost:3000/manuales/${manual.archivo}`}>
                  {manual.archivo}
                </Link>
                <div className="flex gap-4 mt-4">
            <Link
            onClick={()=>handleDelete(manual._id)}
            >
              <img src="src/assets/delete.png" alt=""  className="h-6 w-6"/>
            </Link>  
            <Link
              to={`/actualizarManual/${manual._id}`}
            >
              <img src="src/assets/update.png" alt="" className="h-6 w-6" />
            </Link>  
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
