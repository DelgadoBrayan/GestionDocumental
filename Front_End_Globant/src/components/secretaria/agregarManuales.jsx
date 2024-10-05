import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { Alert } from '../Alerts';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const AgregarManuales = () => {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [publico, setPublico] = useState(false);
  const [fecha_creacion, setFecha_creacion] = useState('')
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
    if ([titulo,tipo, descripcion, publico, fecha_creacion].includes('')) {
      setAlert({msg:"Ingresa valores para todos los campos", error:true, isVisible:true})
      return;
  }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('tipo', tipo);
      formData.append('descripcion', descripcion);
      formData.append('publico', publico);
      formData.append('fecha_creacion', fecha_creacion)
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:3000/manuales/agregarManual', formData, {
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
      setTipo('');
      setDescripcion('');
      setPublico(false);
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
    <h1 className="font-medium text-xl mt-10 mb-5 ml-3">Agregar Manual</h1>
      <article className='flex p-3 gap-10 w-max'>
        <div className='flex flex-col gap-9'>
        <label htmlFor="" className="font-medium">Titulo: </label>
        <label htmlFor="" className="font-medium">Tipo de Manual:</label>
        <label htmlFor="" className="font-medium">Descripcion: </label>
        <label htmlFor="" className="font-medium">Fecha de creacion: </label>
        <label htmlFor="" className="font-medium">Archivo</label>
        <p>publico: {publico ? 'Si' : 'No'}</p>
        </div>
        <div className='flex flex-col w-96 gap-4'>
    <input 
    value={titulo}
    onChange={e=>setTitulo(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={tipo}
    onChange={e=>setTipo(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={descripcion}
    onChange={e=>setDescripcion(e.target.value)}
    type="text" 
    className='border-2 h-10 rounded-md'/>
    <input 
    value={fecha_creacion}
    onChange={e =>setFecha_creacion(e.target.value)}
    type="date" 
    className='mt-4 mb-5'/>
    <input
    onChange={e=>setSelectedFile(e.target.files[0])} 
    type="file" 
    className=' h-10 rounded-md mb-2'/>
    <input 
    className='mb-5 w-6 h-6'
    type="checkbox" 
    checked={publico} 
    onChange={e=>setPublico(e.target.checked)} />
        </div>
      </article>
      <Button 
      type='submit'
      className='bg-slate-500 p-3 rounded-md text-white '>
        Guardar cambios
        </Button>
        <br />
        <br />
    <Link className='font-bold text-lg ' to='/secretaria'> Regresar</Link>
    </form>
  </section>
  )
}
