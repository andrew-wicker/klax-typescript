import { parseString } from 'xml2js';
import { SearchResult } from '../../types';

export const parseXml = (xml: string): Promise<SearchResult> => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, json) => {
      if (err) {
        throw new Error('Error parsing XML');
      } else {
        const item = json.items.item[0];

        const result: SearchResult = {
          id: item.$.id,
          thumbnail: item.thumbnail[0],
          image: item.image[0],
          title: item.name.find((name: any) => name.$.type === 'primary').$
            .value,
          yearpublished: item.yearpublished[0].$.value,
        };
        resolve(result);
      }
    });
  });
};
