import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { Alert } from '../Alerts';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const AgreagarInformeE = () => {
  const [nombre_empleado, setNombre_empleado] = useState('')
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('');
  const [fecha_creacion, setFecha_creacion] = useState('')
  const [fecha_actualizacion, setFecha_actualizacion] = useState('')
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
    if ([nombre_empleado,titulo,estado, descripcion, fecha_creacion, fecha_actualizacion].includes('')) {
      setAlert({msg:"Ingresa valores para todos los campos", error:true, isVisible:true})
      return;
  }

    try {
      const formData = new FormData();
      formData.append('nombre_empleado', nombre_empleado),
      formData.append('titulo', titulo);
      formData.append('estado', estado);
      formData.append('fecha_creacion', fecha_creacion);
      formData.append('fecha_actualizacion', fecha_actualizacion);
      formData.append('descripcion', descripcion);
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:3000/reportes/agregarReporte', formData, {
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
      setNombre_empleado('');
      setTitulo('');
      setEstado('');
      setDescripcion('');
      setFecha_creacion('');
      setFecha_actualizacion('');
    } catch (err) {
      console.error('Error uploading file:', err);
      setAlert({
        msg: "A ocurrido un error mientras se cargaba el archivo",
        error: true,
        isVisible:true
      })
    } 
  };
  return (
    <section className="">
    <form action="" className="ml-96 " onSubmit={handleSubmit}>
    <Alert alert={alert}/>
    <h1 className="font-medium text-xl mt-10 mb-5 ml-3">Agregar Reporte</h1>
      <article className='flex p-3 gap-10 w-max'>
        <div className='flex flex-col gap-9'>
        <label htmlFor="" className="font-medium">Nombre del Empleado:</label>
        <label htmlFor="" className="font-medium">Titulo: </label>
        <label htmlFor="" className="font-medium">Estado: </label>
        <label htmlFor="" className="font-medium">Descripcion: </label>
        <label htmlFor="" className="font-medium">Fecha de creacion: </label>
        <label htmlFor="" className="font-medium">Fecha de Actualizacion: </label>
        <label htmlFor="" className="font-medium">Archivo</label>
        </div>
        <div className='flex flex-col w-96 gap-4'>
    <input 
    value={nombre_empleado}
    onChange={e=> setNombre_empleado(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={titulo}
    onChange={e=> setTitulo(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={estado}
    onChange={e=> setEstado(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={descripcion}
    onChange={e=>setDescripcion(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={fecha_creacion}
    onChange={e=> setFecha_creacion(e.target.value)}
    type="date" 
    className='mt-3'/>
    <input 
    value={fecha_actualizacion}
    onChange={e=> setFecha_actualizacion(e.target.value)}
    type="date" 
    className='mt-5'/>
    <input 
    onChange={e=> setSelectedFile(e.target.files[0])}
    type="file" 
    className='mt-4 h-10 rounded-md mb-6'/>
        </div>
      </article>
      <Button 
      type='submit'
      className='bg-slate-500 p-3 rounded-md text-white '>
      Guardar cambios
      </Button>
      <br />
        <br />
    <Link className='font-bold text-lg ' to='/empleado'> Regresar</Link>
    </form>
  </section>
  )
}
