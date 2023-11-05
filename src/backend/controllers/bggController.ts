import express, { Request, Response, NextFunction } from 'express';
import xml2js from 'xml2js';
import fetch from 'node-fetch';

interface ErrorInfo {
  method: string;
  type: string;
  err: unknown;
}

interface Boardgame {
  boardGameTitle: string;
  boardGameCoverImage: string;
  boardGameThumbnail: string;
  boardGameDescription: string;
  boardGameMinPlayers: number;
  boardGameMaxPlayers: number;
  boardGameYearPublished: string;
}

const createErr = (errInfo: ErrorInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `fileController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occured in fileController.${method}. Check server logs for more details.`,
    },
  };
};

const bggController: {
  [key: string]: (
    req: Request,
    res: Response,
    next: NextFunction,
    gameTitle?: string
  ) => Promise<void>;
} = {
  gameLookup: async (req: Request, res: Response, next: NextFunction) => {
    // if (!req || !res || !next) {
    //   throw new Error('Reqest, response, and next must be provided');
    // }
    try {
      const gameTitle: string = req.params.gameTitle;
      const requestPath: string = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;

      const response = await fetch(requestPath);
      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }

      const xmlData = await response.text();
      const parser = new xml2js.Parser({
        mergeAttrs: true,
        normalizeTags: true,
        normalize: true,
      });

      const jsonData = await parser.parseStringPromise(xmlData);
      const queryId = jsonData.items.item[0].id;
      res.locals.gameId = [...queryId];
      next();
    } catch (err) {
      next(
        createErr({
          method: 'gameLookup',
          type: 'Fetch Error',
          err: err,
        })
      );
    }
  },

  gameDetailLookup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryId = res.locals.gameId;

      const detailUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${queryId}`;

      const response = await fetch(detailUrl);
      if (!response.ok) {
        throw new Error(`Network response was not ok on id query`);
      }
      const parser = new xml2js.Parser({
        mergeAttrs: true,
        normalizeTags: true,
        normalize: true,
      });

      const reqGameData = await response.text();

      const reqGameDataJson = await parser.parseStringPromise(reqGameData);

      const boardGameTitle = reqGameDataJson.items.item[0].name[0].value[0];
      const boardGameCoverImage = reqGameDataJson.items.item[0].image[0];
      const boardGameThumbnail = reqGameDataJson.items.item[0].thumbnail[0];
      const boardGameDescription = reqGameDataJson.items.item[0].description[0];
      const boardGameMinPlayers =
        reqGameDataJson.items.item[0].minplayers[0].value[0];
      const boardGameMaxPlayers =
        reqGameDataJson.items.item[0].maxplayers[0].value[0];
      const boardGameYearPublished =
        reqGameDataJson.items.item[0].yearpublished[0].value[0];
      const boardgame = {
        boardGameTitle,
        boardGameCoverImage,
        boardGameThumbnail,
        boardGameDescription,
        boardGameMinPlayers,
        boardGameMaxPlayers,
        boardGameYearPublished,
      };

      res.locals.boardgame = boardgame;
      return next();
    } catch (err) {
      next(
        createErr({
          method: 'gameDetailLookup',
          type: 'Fetch Error',
          err: err,
        })
      );
    }
  },
  gameSearch: async (gameTitle: string, next: Ne): Promise<any> => {
    try {
      const requestPath = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;
      const response = await fetch(requestPath);
      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }
      const xmlData = await response.text();
      console.log(xmlData);
      // Parse XML data using xml2js
      const parser = new xml2js.Parser({
        mergeAttrs: true,
        normalizeTags: true,
        normalize: true,
      });

      const jsonData = await parser.parseStringPromise(xmlData);
      console.log(jsonData);
      const searchResults = jsonData.items.item;
      console.log(searchResults);
      return searchResults;
    } catch (err) {
      next(
        createErr({
          method: 'gameSearch',
          type: 'Fetch error',
          err: err,
        })
      );
    }
  },
};

export default bggController;
