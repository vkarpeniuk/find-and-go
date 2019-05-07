import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProxyService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getGoogleApiKey(): Observable<string> {
    return this.get('api/getGoogleApiKey');
  }
}
