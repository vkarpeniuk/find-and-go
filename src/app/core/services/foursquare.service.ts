import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { VenueDetails, Venue, VenueFilter } from '@models*';
import { GoogleService } from './google.service';
import { ApiService } from './api.service';
import { FoursquareHelper } from './helpers/foursquare-helper';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService extends ApiService {
  private proxyUrl = 'api/foursquare';
  private foursquareApiUrl = 'https://api.foursquare.com/v2/';

  private defaultSearch = 'top picks';

  constructor(http: HttpClient, private googleService: GoogleService) {
    super(http);
  }

  getVenueRecommendations(filter: VenueFilter): Observable<Venue[]> {
    let params = new HttpParams().set(
      'requestPath',
      `${this.foursquareApiUrl}venues/explore`
    );

    params = params.set('query', filter.search || this.defaultSearch);

    if (filter.locationByMap) {
      params = params
        .set('ll', `${filter.latitude},${filter.longitude}`)
        .set(
          'radius',
          FoursquareHelper.getRadiusByZoomLevel(filter.zoomLevel).toString()
        );
    } else {
      params = params.set('near', filter.near);
    }

    return this.getJson(this.proxyUrl, params).pipe(
      mergeMap(res => of(FoursquareHelper.parseVenuesRecommendations(res))),
      mergeMap(venues => this.googleService.getPlacesPhotosUrls(venues))
    );
  }

  getVenueDetails(id: string): Observable<VenueDetails> {
    const params = new HttpParams().set(
      'requestPath',
      `${this.foursquareApiUrl}venues/${id}`
    );

    return this.getJson(this.proxyUrl, params).pipe(
      mergeMap(res => of(FoursquareHelper.parseVenueDetails(res))),
      mergeMap(venue => this.googleService.getPlaceDetails(venue))
    );
  }
}
