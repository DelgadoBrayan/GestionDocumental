import { Request, Response } from 'express';
import Informe from '../models/informes'; // Assuming informe.model is in the same directory
import multer from 'multer';
import path from 'path';
import fs from 'fs'

// Configuración de Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'informes'), 
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });


export const agregarInforme = async (req: Request, res: Response) => {
  try {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.file as Express.Multer.File; 
      const originalFilename = file.originalname;
      const newInforme = new Informe({
        titulo: req.body.titulo,
        tipoInforme: req.body.tipoInforme, 
        descripcion: req.body.descripcion,
        archivo: originalFilename, 
      });

      try {
        await newInforme.save();
        return res.status(200).json({ message: 'File uploaded successfully' });
      } catch (error) {
        console.error('Error saving informe:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
    });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const leerInforme = async (req: Request, res: Response) => {
  try {
    const informe = await Informe.find({});
    if (!informe) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    return res.json(informe),200;

  } catch (error) {
    console.error('Error al obtener el archivo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const pdfStoragePath = path.join(__dirname, '..', 'informes');

export const actualizarInforme = async (req: Request, res: Response) => {
  const id  = req.params.id;

  const informe = await Informe.findById(id)
  if(!informe){
    return res.status(403).json({
      msg: "informe no encontrado"
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
    const rutaArchivo = path.join(pdfStoragePath, informe.archivo);
    fs.unlinkSync(rutaArchivo); // Elimina el archivo anterior
// Asigna el nombre original al archivo actualizado

    informe.titulo = req.body.titulo
    informe.tipoInforme = req.body.tipoInforme
    informe.descripcion = req.body.descripcion
    informe.archivo = archivoActualizado.filename
    
    await informe.save()

    return res.status(200).json({ message: 'Informe actualizado correctamente' });
    })} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el archivo PDF' });
  }
};


export const borrarInforme = async (req: Request, res: Response) => {
    const { id } = req.params;

    const informe = await Informe.findById(id);
    if(!informe){
      return res.status(403).json({
        msg:" informe no encontrado"
      })
    }
  
    try {
      const rutaArchivo = path.join(pdfStoragePath, informe.archivo);
      fs.unlinkSync(rutaArchivo);
  
      await Informe.findByIdAndDelete(id);
  
      return res.status(200).json({ message: 'Informe eliminado correctamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el archivo PDF' });
    }
  }