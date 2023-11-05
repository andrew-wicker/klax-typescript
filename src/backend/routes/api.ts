import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import bggController from '../controllers/bggController';
// import gameController from '../controllers/gameController';

const apiRouter: Router = express.Router();

apiRouter.use(cors());

apiRouter.get(
  '/:gameTitle',
  bggController.gameLookup,
  bggController.gameDetailLookup,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.boardgame);
  }
);

// router.post('/', gameController.createGame);

export default apiRouter;
