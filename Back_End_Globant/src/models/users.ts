import mongoose,{Document, Model, Schema} from "mongoose";
import bcrypt from 'bcrypt'

interface IUser extends Document{
    type: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    password: string;
    imagen: string;
    check_password(passworForm: string):Promise<boolean>
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    type:{
        type:String,
        requiered: true,
        trim: true
    },
   nombre:{
        type:String,
        requiered: true,
        trim: true
   },
   apellido:{
        type:String,
        requiered: true,
        trim: true
   },
   email:{
        type:String,
        requiered: true,
        trim: true
   },
   telefono:{
        type:Number,
        requiered: true,
        trim: true
   },
   password:{
        type:String,
        requiered: true,
        trim: true
   },
   imagen:{
        type:String,
        requiered: true,
        trim: true
   }

})

userSchema.pre<IUser>("save", async function (next) {
    if(!this.isModified('password')){
        next();
    }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt) 
});

userSchema.methods.check_password = async function (passworForm:string) {
    return await bcrypt.compare(passworForm, this.password);
}

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;