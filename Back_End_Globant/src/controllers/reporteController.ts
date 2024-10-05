import { Request, Response } from "express";
import multer from "multer";
import path from 'path';
import Reporte from "../models/reportes";
import fs from 'fs'
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'reportes'), 
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage });

export const agregarReporte = async (req:Request,res:Response)=>{
    try {
        upload.single('file')(req, res, async (err)=>{
            if(err){
                return res.status(400).json({error: err.message})
            }
            const file = req.file as Express.Multer.File;
            const originalFilename = file.originalname
            const newReporte = new Reporte({
                nombre_empleado: req.body.nombre_empleado,
                titulo: req.body.titulo,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion,
                fecha_actualizacion: req.body.fecha_actualizacion,
                descripcion: req.body.descripcion,
                archivo:originalFilename
                
            });
            try {
                await newReporte.save();
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


export const leerReporte = async (req: Request, res: Response) => {
    try {
      const reporte = await Reporte.find({});
      if (!reporte) {
        return res.status(404).json({ error: 'Archivo no encontrado' });
      }
      return res.json(reporte),200;
  
    } catch (error) {
      console.error('Error al obtener el archivo:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  const pdfStoragePath = path.join(__dirname, '..', 'reportes');

export const actualizarReporte = async (req: Request, res: Response) => {
  const id  = req.params.id;
console.log(id)
  const reporte = await Reporte.findById(id)
  if(!reporte){
    return res.status(403).json({
      msg: "reporte no encontrado"
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
    const rutaArchivo = path.join(pdfStoragePath, reporte.archivo);
    fs.unlinkSync(rutaArchivo); // Elimina el archivo anterior
// Asigna el nombre original al archivo actualizado
    reporte.nombre_empleado = req.body.nombre_empleado
    reporte.titulo = req.body.titulo
    reporte.estado = req.body.estado
    reporte.fecha_creacion = req.body.fecha_creacion
    reporte.fecha_actualizacion = req.body.fecha_actualizacion
    reporte.descripcion = req.body.descripcion
    reporte.archivo = archivoActualizado.filename
    
    await reporte.save()

    return res.status(200).json({ message: 'Reporte actualizado correctamente' });
    })} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el archivo PDF' });
  }
};


export const borrarReporte = async (req: Request, res: Response) => {
    const { id } = req.params;

    const reporte = await Reporte.findById(id);
    if(!reporte){
      return res.status(403).json({
        msg:" reporte no encontrado"
      })
    }
  
    try {
      const rutaArchivo = path.join(pdfStoragePath, reporte.archivo);
      fs.unlinkSync(rutaArchivo);
  
      await  Reporte.findByIdAndDelete(id);
  
      return res.status(200).json({ message: 'reporte eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el archivo PDF' });
    }
  }