import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() {}

  getCurrentPosition(): Observable<any> {
    return Observable.create(observer => {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          },
          error => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }
}
