import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Venue, VenueDetails } from '@models*';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getMapsScriptContent(url: string): Observable<string> {
    const params = new HttpParams().set('url', url);
    return this.getText('api/google-maps-script', params);
  }

  getPlacesPhotosUrls(venues: Venue[]): Observable<{ [id: string]: string }> {
    const body = {
      venues: venues.map(venue => {
        return {
          id: venue.id,
          query: `${venue.name}, ${venue.city || venue.country}`
        };
      })
    };
    return this.post('api/place-photos', body);
  }

  getPlaceDetails(venue: VenueDetails): Observable<VenueDetails> {
    const params = new HttpParams().set(
      'searchQuery',
      `${venue.name}, ${venue.city || venue.country}`
    );
    return this.getJson('api/place-details', params).pipe(
      map(detailsRes => {
        const response: any = detailsRes;
        venue.photos = response.photos.map(photo => photo);
        if (response.tips) {
          venue.tips = response.tips.map(tip => {
            return {
              authorName: tip.author_name,
              profilePhotoUrl: tip.profile_photo_url,
              rating: tip.rating,
              relativeTimeDescription: tip.relative_time_description,
              text: tip.text,
              time: tip.time
            };
          });
        }
        return venue;
      })
    );
  }
}
