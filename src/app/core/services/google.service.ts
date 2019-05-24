import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Venue } from '../models/venue.model';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getMapsScriptContent(url: string): Observable<string> {
    const params = new HttpParams().set('requestPath', url);
    return this.getText('api/google-maps-script', params);
  }

  getPlacePhotosUrls(venues: Venue[]): Observable<Venue[]> {
    const body = {
      venues: venues.map(venue => {
        if (venue.city) {
          return { id: venue.id, query: `${venue.name}, ${venue.city}` };
        } else {
          return { id: venue.id, query: `${venue.name}, ${venue.country}` };
        }
      })
    };
    return this.post('api/place-photos', body).pipe(
      mergeMap(photosRes => {
        photosRes.forEach(venuePhoto => {
          venues.find(v => v.id === venuePhoto.id).imageUrl =
            venuePhoto.photoUrl;
        });
        return of(venues);
      })
    );
  }
}
