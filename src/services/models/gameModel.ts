import mongoose, { Schema } from 'mongoose';
import { IGame } from '../types/types';

const gameSchema = new Schema<IGame>({
  bggId: { type: Number, required: true },
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  minPlayers: { type: Number, required: true },
  maxPlayers: { type: Number, required: true },
  yearPublished: { type: Number, required: true },
});

const Game = mongoose.model<IGame>('Game', gameSchema);
export default Game;
