import { BoardGame } from '../types/types';
import { XMLParser } from 'fast-xml-parser';

export const gameDetailLookup = async (id: string) => {
  const bggUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${id}`;

  const response = await fetch(bggUrl);

  if (!response.ok) {
    throw new Error(`Network response was not ok on id lookup`);
  }

  const xmlData = await response.text();

  const options = {
    attributeNamePrefix: '',
    ignoreAttributes: false,
    parseAttributeValue: true,
  };
  const parser = new XMLParser(options);
  const jsonData = parser.parse(xmlData);

  const boardGameTitle = jsonData.items.item.name[0].value;

  const boardGameCoverImage = jsonData.items.item.image;
  const boardGameThumbnail = jsonData.items.item.thumbnail;
  const boardGameDescription = jsonData.items.item.description;
  const boardGameMinPlayers = jsonData.items.item.minplayers.value;
  const boardGameMaxPlayers = jsonData.items.item.maxplayers.value;
  const boardGameYearPublished = jsonData.items.item.yearpublished.value;

  const boardgame: BoardGame = {
    boardGameId: id,
    boardGameTitle,
    boardGameCoverImage,
    boardGameThumbnail,
    boardGameDescription,
    boardGameMinPlayers,
    boardGameMaxPlayers,
    boardGameYearPublished,
  };

  console.log('boardgame', boardgame);
  return boardgame;
};
