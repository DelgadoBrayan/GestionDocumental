import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionDB from './database/db';
import manualesRouter from './routers/manualesRouter';
import userRouter from './routers/userRouter';
import formatosRouter from './routers/routesFormatos';
import informesRouter from './routers/routesInforme';
import reportesRouter from './routers/routesReportes';
import path from 'path'
const app = express();
app.use(express.json());
dotenv.config()
connectionDB()
app.use(cors())

app.use('/manuales', manualesRouter);
app.use('/usuarios', userRouter);
app.use('/formatos', formatosRouter);
app.use('/informes', informesRouter);
app.use('/reportes', reportesRouter);
app.use('/manuales', express.static(path.join(__dirname, 'manuales')));
app.use('/informes', express.static(path.join(__dirname, 'informes')));
app.use('/formatos', express.static(path.join(__dirname, 'formatos')));
app.use('/reportes', express.static(path.join(__dirname, 'reportes')))
console.log(__dirname)
const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`server working correctly ${PORT}`)
})