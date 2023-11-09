import { parseString } from 'xml2js';
import { ParsedXmlResult } from '../types/types';

export const parseXml = (xml: string): Promise<ParsedXmlResult> => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, json) => {
      if (err) {
        throw new Error('Error parsing XML');
      } else {
        const item = json.items.item[0];

        const result: ParsedXmlResult = {
          boardGameId: item.$.id,
          boardGameThumbnail: item.thumbnail[0],
          boardGameCoverImage: item.image[0],
          boardGameTitle: item.name.find(
            (name: any) => name.$.type === 'primary'
          ).$.value,
          boardGameYearPublished: item.yearpublished[0].$.value,
        };
        resolve(result);
      }
    });
  });
};
