export interface ErrorInfo {
  method: string;
  type: string;
  err: unknown;
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

export interface SearchResultType {
  boardGameId: string;
  boardGameTitle: string;
  // boardGameCoverImage: string;
  boardGameThumbnail: string;
  // boardGameDescription: string;
  // boardGameMinPlayers: string;
  // boardGameMaxPlayers: string;
  boardGameYearPublished: string;
  onAddToCollection?: (game: BoardGame) => void;
}

export interface BoardGame {
  boardGameId: string;
  boardGameTitle: string;
  boardGameCoverImage: string;
  boardGameThumbnail: string;
  boardGameDescription: string;
  boardGameMinPlayers: string;
  boardGameMaxPlayers: string;
  boardGameYearPublished: string;
}
