import { Request, Response, NextFunction } from "express";
import User from "../models/users";
import checkAuth from "../middleware/authMiddleware";
import triggerJWT from "../helpers/triggerJWT";

export const addUser = async( req: Request, res: Response)=>{
    try{
        const user = req.body;
        if(!user){
            return res.status(400).json({
                msg:"Missing required fields"
            });
        }

    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json({
        msg: "user Create successfully"
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}

export const updateUser = async (req: Request, res:Response)=>{
    const id = req.params.id; 
    const {type, nombre, apellido, email, telefono, imagen} = req.body;
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({
            msg: "user not found"
        })
    }

    try {
        user!.type = type;
        user!.nombre = nombre;
        user!.apellido = apellido;
        user!.email = email;
        user!.telefono = telefono;
        user!.imagen = imagen;
        await user.save()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

export const deleteUser = async (req: Request, res:Response)=>{
    const id = req.params.id 
    try {
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({
                msg:"User not found"
            })
        }
        return res.json("User delete successfully")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

export const getUsers = async (req:Request, res:Response)=>{
    try {
        const user = await User.find({}).lean();
        if(!user){
            return res.status(403).json({
                msg: "Users not found"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Internal server Error"
        })
    }
}


export const getUser= async (req:Request, res:Response)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(403).json({
            msg: "invalid or inexistent token"
        })
    }
    const userId = checkAuth(token);
    if(!userId){
        return res.status(403).json({
            msg: "Token no valido"
        })
    }

    try {
        const user = await User.findById(userId)
        return res.status(200).json(
            user
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:" Internal server error"
        })
    }
}

export const validateUser =async (req: Request, res:Response)=>{
    const {email, password}= req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                msg:"Email or password incorret"
            })
        }

        if(await user!.check_password(password)){
            return res.status(200).json({
                type: user.type,
                token: triggerJWT(user._id)
            })
        }else{
            return res.status(403).json({
                msg: "Password incorret"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


export const getUserId = async(req: Request,  res: Response)=>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user){
        return res.status(403).json({
            msg:"Usuario no existe"
        })
    }
    try {
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
    }
}