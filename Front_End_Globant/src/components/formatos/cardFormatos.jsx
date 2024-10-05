import {
  Input,
  Button
} from "@material-tailwind/react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export const CardFormatos = () => {
  const [data, setData] = useState(null)
  const [searchFormato, setSearchFormato] = useState('')
  const [formato, setFormato] = useState(null)
  const [formatoNoEntotrado, setFormatoNoEntotrado] = useState('')
  useEffect(() => {
    const obtenerUsuario = async () => {
      const response = await axios.get(`http://localhost:3000/formatos/leerFormatos`);
      setData(response.data);
    };
    obtenerUsuario();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataFormatoEncontrado = data.filter(
      (manualEncoFormato) => manualEncoFormato.titulo == searchFormato
    );
    setFormato(dataFormatoEncontrado)
    if(dataFormatoEncontrado.length==0){
      setFormatoNoEntotrado("EL formato no se encuentra en la base de datos")
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/formatos/borrarFormato/${id}`);
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
            value={searchFormato}
            type="search"
            id="search"
            name="search"
            placeholder="Search"
            className=" border-black  pl-9 placeholder:text-black focus:border-green-800 w-96  h-10 float-right rounded-md "
            onChange={e => setSearchFormato(e.target.value)}
          />
          <Button
            className="bg-black p-3 "
            type="submit">
            Buscar
          </Button>
        </form>
        <h1 className="font-semibold text-xl mt-4">Formatos</h1>
        <div className='flex gap-5 place-content-evenly mt-10 flex-wrap'>
          {formatoNoEntotrado ?  <div className="text-center"> <h1 className="text-2xl font-bold mb-10">{formatoNoEntotrado}</h1>
          <Link 
          className="bg-slate-900 text-white p-2 rounded-md" 
          to={'/gestionformatos'}
          >Regresar</Link> </div>
          : formato ? formato && formato.map((formatoEncontrado) => (
            <article className='border-2 w-max p-6 ' key={formatoEncontrado._id}>
              <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p> {formatoEncontrado.titulo}</h1>
              <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Tipo:</p>{formatoEncontrado.tipo}</h1>
              <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{formatoEncontrado.descripcion}</h1>
              <h1 className='flex'><p className='font-medium text-lg'>Fecha de Creacion:</p>{formatoEncontrado.fecha_creacion}</h1>
          
              <div className='flex gap-10'>
                <Link
                  className='mt-4 text-cyan-600 font-medium'
                  to={`http://localhost:3000/formatos/${formatoEncontrado.archivo}`}>
                  {formatoEncontrado.archivo}
                </Link>
                <img src='src/assets/descargas.png' className='w-6 h-6 mt-2'></img>
              </div>
            </article>
          )) : data && data.map((formato) => (
            <article className='border-2 w-max p-6 ' key={formato._id}>
              <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p> {formato.titulo}</h1>
              <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Tipo:</p>{formato.tipo}</h1>
              <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{formato.descripcion}</h1>
              <h1 className='flex'><p className='font-medium text-lg'>Fecha de Creacion:</p>{formato.fecha_creacion}</h1>
         

              <div className='flex gap-10'>
                <Link
                  className='mt-4 text-cyan-600 font-medium'
                  to={`http://localhost:3000/formatos/${formato.archivo}`}>
                  {formato.archivo}
                </Link>
                <div className="flex gap-4 mt-4">
            <Link
            onClick={()=>handleDelete(formato._id)}
            >
              <img src="src/assets/delete.png" alt=""  className="h-6 w-6"/>
            </Link>  
            <Link
              to={`/actualizarformato/${formato._id}`}
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
