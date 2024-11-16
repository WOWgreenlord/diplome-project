import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor() {}
  http = inject(HttpClient);
  apiUrl: string =
    'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_EdBWKDyDfMgzEvr26K0CsdIR7crPO8TVVV7JChFs';
  api_key: string = 'fca_live_EdBWKDyDfMgzEvr26K0CsdIR7crPO8TVVV7JChFs';
  getRatesUSD(): Observable<any> {
    const params = {
      base_currency: 'USD',
      currencies: 'RUB',
    };
    return this.http.get(this.apiUrl, { params });
  }
  getRatesEUR(): Observable<any> {
    const params = {
      base_currency: 'EUR',
      currencies: 'RUB',
    };
    return this.http.get(this.apiUrl, { params });
  }
}
