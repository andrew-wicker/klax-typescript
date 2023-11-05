import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
// import apiRouter from '..routes/api';
// import mongoApi from '../routes/mongoApi';
// import mongoose from 'mongoose';
import { Request, Response } from 'express';
import 'dotenv/config';

const app: Express = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const publicUrl: string = process.env.PUBLIC_URL || '/public';

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', publicUrl)));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).sendFile(path.resolve(__dirname, publicUrl, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

module.exports = app;
