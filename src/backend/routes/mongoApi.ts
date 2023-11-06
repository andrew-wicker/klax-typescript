import gameController from '../controllers/gameController';
import express, { Router } from 'express';
import cors from 'cors';

const mongoRouter: Router = express.Router();

mongoRouter.use(cors());
mongoRouter.get('/', gameController.getCollection);

export default mongoRouter;
