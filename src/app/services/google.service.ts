import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getMapsScriptContent(url: string): Observable<string> {
    const params = new HttpParams().set('requestPath', url);
    return this.getText('api/googleMapsScript', params);
  }

  getPlacePhotoUrl(): Observable<string> {
    const body = {
      venues: [
        {
          id: '123',
          query: 'copperhead, івано-франківськ'
        },
        {
          id: '486',
          query: "п'ятниця, івано-франківськ"
        }
      ]
    };
    return this.post('api/googlePlaces', body);
  }
}
