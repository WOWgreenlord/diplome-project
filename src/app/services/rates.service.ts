import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor() {}
  http = inject(HttpClient);
  apiUrl: string = 'http://api.exchangeratesapi.io/v1/';
  access_key: string = '3cd9bd94af6fde86bc8688a61099b4bb';
  getRates(): Observable<any> {
    return this.http.get(this.apiUrl + 'latest?access_key=' + this.access_key);
  }
}
