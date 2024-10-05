import mongoose, { Document, Model, Schema } from 'mongoose';

interface IInforme extends Document {
  titulo:string;
  tipoInforme: string;
  descripcion: string;
  archivo: string; 
}

const informeSchema: Schema<IInforme> = new mongoose.Schema({
  titulo:{
    type:String,
    required: true,
    trim: true
  },
  tipoInforme: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  archivo: {
    type: String,
    required: true,
  },
});

const Informe: Model<IInforme> = mongoose.model<IInforme>('Informe', informeSchema);

export default Informe;

