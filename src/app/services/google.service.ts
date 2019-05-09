import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
}
