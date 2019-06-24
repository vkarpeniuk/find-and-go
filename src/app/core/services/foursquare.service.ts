import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { VenueDetails, Venue } from '@models*';
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

  getVenueRecommendations(
    latitude: number = null,
    longitude: number = null,
    search: string = null,
    near: string = null,
    locationByMap: boolean,
    zoomLevel: number,
    limit: number = 20,
    offset: number = 0
  ): Observable<Venue[]> {
    let params = new HttpParams().set(
      'requestPath',
      `${this.foursquareApiUrl}venues/explore`
    );

    params = params.set('query', search || this.defaultSearch);

    if (locationByMap) {
      params = params
        .set('ll', `${latitude},${longitude}`)
        .set(
          'radius',
          FoursquareHelper.getRadiusByZoomLevel(zoomLevel).toString()
        );
    } else {
      params = params.set('near', near);
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
