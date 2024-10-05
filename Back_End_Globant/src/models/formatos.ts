import mongoose, {Document, Model, Schema} from "mongoose";

interface IFormatos extends Document{
    titulo: string;
    tipo: string;
    descripcion: string;
    publico: boolean;
    fecha_creacion:string;
    archivo: string; 
}

const formatoShema: Schema<IFormatos> = new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
        trim:true
    },
    tipo:{
        type:String,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true
    },
    publico:{
        type:Boolean,
        required:true
    },
    fecha_creacion:{
        type:String,
        required:true,
        trim:true
    },
    archivo:{
        type:String,
        required:true,
        trim:true
    }

})

const Formato : Model<IFormatos> = mongoose.model<IFormatos>('Formato', formatoShema);

export default Formato;