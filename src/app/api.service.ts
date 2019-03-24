import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/vnd.heroku+json; version=3'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTestVar(): Observable<any> {
    return this.http.get(
      'https://api.heroku.com/apps/find-and-go/config-vars',
      httpOptions
    );
  }
}
