import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

export abstract class ApiService {
  defaultOptions: object = {
    params: new HttpParams(),
    responseType: 'json'
  };

  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, options = this.defaultOptions): Observable<any> {
    return this.http.get(path, options).pipe(catchError(this.formatErrors));
  }

  getText(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<string> {
    return this.get(path, { params, responseType: 'text' });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatErrors));
  }
}