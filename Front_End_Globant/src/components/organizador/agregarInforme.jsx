import React,{useState} from 'react'
import { Alert } from '../Alerts';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
export const AgregarInforme = () => {
  const [titulo, setTitulo] = useState('');
  const [tipoInforme, setTipoInforme] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
 const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setAlert({
        msg: "Please select a file to upload.",
        error: true,
        isVisible:true
      })
      return;
    }
    if ([titulo,tipoInforme, descripcion].includes('')) {
      setAlert({msg:"Ingresa valores para todos los campos", error:true, isVisible:true})
      return;
  }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('tipoInforme', tipoInforme);
      formData.append('descripcion', descripcion);
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:3000/informes/agregarInforme', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlert({
        msg: "Informe cargado correctamente",
        error: false,
        isVisible:true
      })
      setSelectedFile(null);
      setTitulo('');
      setTipoInforme('');
      setDescripcion('');
    } catch (err) {
      console.error('Error uploading file:', err);
      setAlert({
        msg: "A ocurrido un error mientras se cargaba el archivo",
        error: true,
        isVisible:true
      })
    } 
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <section className="">
    <form action="" className="ml-96 " onSubmit={handleSubmit}>
      <Alert alert={alert}/>
    <h1 className="font-medium text-xl pt-10 mb-5 ml-3">Agregar Informe</h1>
      <article className='flex p-3 gap-10 w-max'>
        <div className='flex flex-col gap-9'>
        <label htmlFor="" className="font-medium">Titulo: </label>
        <label htmlFor="" className="font-medium">Tipo de informe:</label>
        <label htmlFor="" className="font-medium">Descripcion: </label>
        <label htmlFor="" className="font-medium">Archivo</label>
        </div>
        <div className='flex flex-col w-96 gap-4'>
    <input 
    value={titulo}
    onChange={e=>setTitulo(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={tipoInforme}
    onChange={e=>setTipoInforme(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input
    value={descripcion}
    onChange={e=> setDescripcion(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    onChange={handleFileChange} 
    type="file" 
    className=' h-10 rounded-md mb-6'/>
        </div>
      </article>
      <Button 
      type='submit'
      className='bg-slate-500 p-3 rounded-md text-white '>
        Guardar cambios
        </Button>
    </form>
  </section>
  )
}
