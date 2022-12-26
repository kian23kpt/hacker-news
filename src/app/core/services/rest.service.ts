import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { CONSTANTS } from '../util/constants';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private _http: HttpClient) {}

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public getNewStories(): Observable<number[]> {
    return this._http.get<number[]>(CONSTANTS.BASE_URL + 'newstories.json', {
      headers: this.setHeaders(),
    });
  }

  public getItem(itemId: number): Observable<Item> {
    return this._http.get<Item>(CONSTANTS.BASE_URL + `item/${itemId}.json`, {
      headers: this.setHeaders(),
    });
  }
}
