import { useEffect,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const CardInfromes = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const obtenerUsuario = async () => {
      const response = await axios.get(`http://localhost:3000/informes/leerInformes`);
      setData(response.data);
    };
    obtenerUsuario();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/informes/borrarInforme/${id}`);
      console.log("borrado correctamenete")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    {data && data.map((informe)=>( 
      
      <article className='border-2 w-max p-6' key={informe._id}>
        <h1 className=' flex'><p className='font-medium text-lg'> Titulo: </p>{informe.titulo}</h1>
        <h1 className='mt-4 flex'> <p className='font-medium text-lg'>Tipo:</p>{informe.tipoInforme}</h1>
        <h1 className='w-80 mt-4 flex'> <p className='font-medium text-lg'>Descripcion: </p>{informe.descripcion}</h1>
        <div className='flex gap-24'>
        <Link 
        className='mt-4 text-cyan-600 font-medium'
        to={`http://localhost:3000/informes/${informe.archivo}`}>
        {informe.archivo}
        </Link>
       
        <div className="flex gap-4 mt-4">
            <Link
            onClick={()=>handleDelete(informe._id)}
            >
              <img src="src/assets/delete.png" alt=""  className="h-6 w-6"/>
            </Link>  
            <Link
              to={`/actualizarinforme/${informe._id}`}
            >
              <img src="src/assets/update.png" alt="" className="h-6 w-6" />
            </Link>  
                </div>
        </div>

    </article>
    
        )) }
    
    </>
  )
}
