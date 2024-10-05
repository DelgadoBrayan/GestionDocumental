import mongoose, {Document, Model, Schema, modelNames} from "mongoose";

interface IManuales extends Document{
    titulo: string;
    tipo: string;
    descripcion: string;
    publico: boolean;
    fecha_creacion: string;
    archivo: string;
}

const manualShema: Schema<IManuales> = new mongoose.Schema({
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
        required:true,
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

const Manual:Model<IManuales> = mongoose.model<IManuales>('Manual', manualShema);

export default Manual;