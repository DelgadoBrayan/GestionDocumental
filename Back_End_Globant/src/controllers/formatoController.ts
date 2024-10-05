import { Request, Response } from "express";
import Formato from "../models/formatos";
import multer from "multer";
import path from 'path';
import fs from 'fs'
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'formatos'), 
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage });

export const agregarFormato = async (req:Request,res:Response)=>{
    try {
        upload.single('file')(req, res, async (err)=>{
            if(err){
                return res.status(400).json({error: err.message})
            }
            const file = req.file as Express.Multer.File;
            const originalFilename = file.originalname
            const newFormato = new Formato({
                titulo: req.body.titulo,
                tipo: req.body.tipo,
                descripcion: req.body.descripcion,
                publico: req.body.publico,
                fecha_creacion: req.body.fecha_creacion,
                archivo:originalFilename
                
            });
            try {
                await newFormato.save();
                return res.status(200).json({ message: 'File uploaded successfully' });
            } catch (error) {
                console.error('Error saving manual', error)
                return res.status(500).json({error: 'error interno del servidor'})
            }
        }) 
    } catch (error) {
        console.error('Error al subir al archivo', error)
        return res.status(500).json({error:'Error interno  o del servidor'})
    }
}


export const leerFormato = async (req: Request, res: Response) => {
    try {
      const formato = await Formato.find({});
      if (!formato) {
        return res.status(404).json({ error: 'Archivo no encontrado' });
      }
      return res.json(formato),200;
  
    } catch (error) {
      console.error('Error al obtener el archivo:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const pdfStoragePath = path.join(__dirname, '..', 'formatos');

  export const actualizarFormato = async (req: Request, res: Response) => {
    const id  = req.params.id;
  console.log(id)
    const formato = await Formato.findById(id)
    if(!formato){
      return res.status(403).json({
        msg: "formato no encontrado"
      })
    }
  
    try {
      upload.single('file')(req, res, async (err)=>{
        if(err){
            return res.status(400).json({
                msg: err.message
            })
        }
      const archivoActualizado = req.file as Express.Multer.File;
      console.log(archivoActualizado)
      const rutaArchivo = path.join(pdfStoragePath, formato.archivo);
      fs.unlinkSync(rutaArchivo); // Elimina el archivo anterior
  // Asigna el nombre original al archivo actualizado
  
      formato.titulo = req.body.titulo
      formato.tipo = req.body.tipo
      formato.descripcion = req.body.descripcion
      formato.publico = req.body.publico
      formato.fecha_creacion = req.body.fecha_creacion
      formato.archivo = archivoActualizado.filename
      
      await formato.save()
  
      return res.status(200).json({ message: 'Archivo PDF actualizado correctamente' });
      })} catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al actualizar el archivo PDF' });
    }
  };
  
  
  export const borrarFormato = async (req: Request, res: Response) => {
      const { id } = req.params;
  
      const formato = await Formato.findById(id);
      if(!formato){
        return res.status(403).json({
          msg:" manual no encontrado"
        })
      }
    
      try {
        const rutaArchivo = path.join(pdfStoragePath, formato.archivo);
        fs.unlinkSync(rutaArchivo);
    
        await Formato.findByIdAndDelete(id);
    
        return res.status(200).json({ message: 'Formato eliminado correctamente' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el archivo PDF' });
      }
    }