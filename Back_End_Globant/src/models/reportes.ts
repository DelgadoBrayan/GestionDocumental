import mongoose, {Document, Model, Schema} from "mongoose";
interface IReportes extends Document{
    nombre_empleado: string,
    titulo: string,
    estado: string,
    fecha_creacion: string,
    fecha_actualizacion: string,
    descripcion: string,
    archivo: string    
}

const reporteShema: Schema<IReportes> = new mongoose.Schema({
   nombre_empleado:{
    type:String,
    required: true,
    trim: true,
   },
   titulo:{
    type:String,
    required: true,
    trim: true 
   },
   estado:{
    type:String,
    required: true,
    trim: true 
   },
   fecha_creacion:{
    type:String,
    required: true,
    trim: true 
   },
   fecha_actualizacion:{
    type:String,
    required: true,
    trim: true 
   },
   descripcion:{
    type:String,
    required: true,
    trim: true 
   },
   archivo:{
    type:String,
    required: true,
    trim: true 
   }
})

const Reporte : Model<IReportes> = mongoose.model<IReportes>('Reporte', reporteShema)

export default Reporte;