import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class ConvertJsonService {

  constructor() { }

  convertXmlToJson(xml: string): Promise<any> {
      return new Promise((resolve, reject) => {
        parseString(xml, { explicitArray: false }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
}
