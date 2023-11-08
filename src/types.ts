export interface ErrorInfo {
  method: string;
  type: string;
  err: unknown;
}

export interface GameData {
  bggId: string;
  title: string;
  coverImage: string;
  thumbnail: string;
  descriptions: string;
  minPlayers: string;
  maxPlayers: string;
  yearPublished: string;
}

export interface GameTileProps {
  game: {
    title: string;
    coverImage: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    yearPublished: number;
  };
}

export interface Game {
  id: string;
  title: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
  coverImage: string;
}

export interface IGame extends Document {
  bggId: number;
  title: string;
  coverImage: string;
  thumbnail: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
}

export interface GameTileInfo {
  title: string;
  coverImage: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
}

export interface DisplayState {
  bggId: number | null;
  title: string;
  coverImage: string;
  thumbnail: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
  options: any[];
}

// export interface SearchResult {
//   id: string;
//   name: object;
//   yearPublished: object;
// }

export interface ParsedXmlResult {
  [key: string]: string | ParsedXmlResult | ParsedXmlResult[];
}

export interface ApiGame {
  type: string;
  id: string;
  name: {
    type: string;
    value: string;
  };
  yearpublished: {
    value: string;
  };
}

export interface SearchResult {
  id: string;
  thumbnail?: string;
  image?: string;
  title: string;
  yearpublished: string;
}

export interface BoardGame {
  boardGameId?: string;
  boardGameTitle?: string;
  boardGameCoverImage?: string;
  boardGameThumbnail?: string;
  boardGameDescription?: string;
  boardGameMinPlayers?: number;
  boardGameMaxPlayers?: number;
  boardGameYearPublished?: number;
}
