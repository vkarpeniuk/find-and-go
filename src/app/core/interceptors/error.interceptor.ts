import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from '@reducers*';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ShowErrorAction } from '@actions*';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(new ShowErrorAction({ error: error.message }));
        return throwError(error);
      })
    );
  }
}
