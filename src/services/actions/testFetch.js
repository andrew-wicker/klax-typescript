// import { useDispatch } from 'react-redux';
// import * as types from '../constants/actionTypes';
// import bggController from '../controllers/bggController';
const SEARCH_GAME = require('SEARCH_GAME');
const xml2js = require('xml2js');

const searchGameActionCreator = (gameTitle) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_GAME });

    const requestPath = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;

    const response = await fetch(requestPath);

    if (!response.ok) {
      throw new Error('Network response was not ok!');
    }

    const xmlData = await response.text();

    const parser = new xml2js.Parser({
      // mergeAttrs: true,
      // normalizeTags: true,
      // normalize: true,
      // explicitArray: false,
    });

    const jsonData = await parser.parseStringPromise(xmlData);
    console.log(jsonData);
    const searchResults = jsonData.items.item;
    console.log(searchResults);

    // const titleSelection = [];
    // searchResults.forEach((game) => {
    //   const gameObj = {
    //     id: game.id,
    //     title: game.name ? game.name.value : 'Unknown',
    //     yearPublished: game.yearpublished
    //       ? game.yearpublished.value
    //       : 'Unknown',
    //   };
    //   titleSelection.push(gameObj);
    // });
    // console.log(searchResults);
    // console.log(titleSelection);
  } catch (error) {
    console.error(error);
  }
};

searchGameActionCreator('Kites');
