import mongoose from 'mongoose';
import Game from '../../services/models/gameModel.js';
import { Request, Response } from 'express';
import { BoardGame } from '../../services/types/types.js';

const mongoURI: string = process.env.MONGO_URI || '';

mongoose.connect(mongoURI);

// const klax = mongoose.connection;

const gameController = {
  createGame: async (req: Request, res: Response, next: Function) => {
    try {
      const {
        boardGameId,
        boardGameTitle,
        boardGameCoverImage,
        boardGameThumbnail,
        boardGameDescription,
        boardGameMinPlayers,
        boardGameMaxPlayers,
        boardGameYearPublished,
      }: BoardGame = req.body;

      const newGame = new Game({
        boardGameId,
        boardGameTitle,
        boardGameCoverImage,
        boardGameThumbnail,
        boardGameDescription,
        boardGameMinPlayers,
        boardGameMaxPlayers,
        boardGameYearPublished,
      });

      await newGame.save();
      res.status(201).json({ message: 'Game added to collection' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'An error occurred while adding the game to the collection',
      });
    }
  },

  getCollection: async (req: Request, res: Response, next: Function) => {
    try {
      const games = await Game.find({});
      return res.status(200).json(games);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'An error occurred while fetching the collection',
      });
    }
  },
};

export default gameController;
