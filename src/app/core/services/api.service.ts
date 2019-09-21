import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class ApiService {
  defaultOptions: object = {
    params: new HttpParams(),
    responseType: 'json'
  };

  defaultHeaders: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8'
  );

  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, options = this.defaultOptions): Observable<any> {
    return this.http.get(path, options).pipe(catchError(this.formatErrors));
  }

  getJson(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<string> {
    return this.get(path, { params, responseType: 'json' });
  }

  getText(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<string> {
    return this.get(path, { params, responseType: 'text' });
  }

  put(path: string, body: any = {}): Observable<any> {
    return this.http
      .put(path, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: object = {},
    headers: HttpHeaders = this.defaultHeaders
  ): Observable<any> {
    return this.http
      .post(path, JSON.stringify(body), { headers })
      .pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatErrors));
  }
}
