import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { mergeMap } from 'rxjs/operators';
import { Venue, VenueDetails } from '@models*';

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

  getPlacesPhotosUrls(venues: Venue[]): Observable<Venue[]> {
    const body = {
      venues: venues.map(venue => {
        return {
          id: venue.id,
          query: `${venue.name}, ${venue.city || venue.country}`
        };
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

  getPlaceDetails(venue: VenueDetails): Observable<VenueDetails> {
    let searchQuery = '';
    if (venue.city) {
      searchQuery = `${venue.name}, ${venue.city}`;
    } else {
      searchQuery = `${venue.name}, ${venue.country}`;
    }
    const params = new HttpParams().set('searchQuery', searchQuery);
    return this.getJson('api/place-details', params).pipe(
      mergeMap(detailsRes => {
        const response: any = detailsRes;
        venue.photos = response.photos.map(photo => photo);
        if (response.tips) {
          venue.tips = response.tips.map(tip => {
            return {
              authorName: tip.author_name,
              profilePhotoUrl: tip.profile_photo_url,
              rating: tip.rating,
              relativeTimeDescription: tip.relative_time_description,
              text: tip.text
            };
          });
        }
        return of(venue);
      })
    );
  }
}
