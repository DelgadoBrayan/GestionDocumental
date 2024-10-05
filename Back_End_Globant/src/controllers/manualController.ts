import { Request, Response } from "express";
import Manual from "../models/manuales";
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'manuales'),
    filename: (req, file, cd)=>{
        cd(null, file.originalname);
    }
});

    const upload = multer({storage});

export const addManual = async (req:Request, res:Response)=>{
    try {
        
        upload.single('file')(req, res, async (err)=>{
            if(err){
                return res.status(400).json({
                    msg: err.message
                })
            }

        const file = req.file as Express.Multer.File;
        const originalname= file.originalname
        const newManual = new Manual({
            titulo: req.body.titulo,
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            publico: req.body.publico,
            fecha_creacion: req.body.fecha_creacion,
            archivo: originalname
        });
        try {
            await newManual.save()
            return res.status(200).json({
                msg: 'file uploaded succesfully'
            });
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                msg: "Error Saving manual"
            })
        }

        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


export const readManuales = async (req:Request, res:Response)=>{
    try {
        const manual = await Manual.find({});
        if (!manual) {
          return res.status(404).json({ error: 'Archive not found' });
        }
        return res.json(manual),200;
    
      } catch (error) {
        console.error('Error getting file:', error);
        return res.status(500).json({ error: 'Internal server Error' });
      }
}


const pdfStoragePath = path.join(__dirname, '..', 'manuales');

export const actualizarPDF = async (req: Request, res: Response) => {
  const id  = req.params.id;
console.log(id)
  const manual = await Manual.findById(id)
  if(!manual){
    return res.status(403).json({
      msg: "manual no encontrado"
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
    const rutaArchivo = path.join(pdfStoragePath, manual.archivo);
    fs.unlinkSync(rutaArchivo); // Elimina el archivo anterior
// Asigna el nombre original al archivo actualizado

    manual.titulo = req.body.titulo
    manual.tipo = req.body.tipo
    manual.descripcion = req.body.descripcion
    manual.publico = req.body.publico
    manual.fecha_creacion = req.body.fecha_creacion
    manual.archivo = archivoActualizado.filename
    
    await manual.save()

    return res.status(200).json({ message: 'Archivo PDF actualizado correctamente' });
    })} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el archivo PDF' });
  }
};


export const borrarPDF = async (req: Request, res: Response) => {
    const { id } = req.params;

    const manual = await Manual.findById(id);
    if(!manual){
      return res.status(403).json({
        msg:" manual no encontrado"
      })
    }
  
    try {
      const rutaArchivo = path.join(pdfStoragePath, manual.archivo);
      fs.unlinkSync(rutaArchivo);
  
      await Manual.findByIdAndDelete(id);
  
      return res.status(200).json({ message: 'Manual eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el archivo PDF' });
    }
  }
  