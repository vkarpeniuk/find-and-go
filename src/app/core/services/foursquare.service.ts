import { GoogleService } from './google.service';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FoursquareHelper } from './helpers/foursquare-helper';
import { Venue } from '../models/venue.model';

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
    limit: number = 20,
    offset: number = 0
  ): Observable<Venue[]> {
    let params = new HttpParams().set(
      'requestPath',
      `${this.foursquareApiUrl}venues/explore`
    );

    if (search) {
      params = params.set('query', search);
    } else {
      params = params.set('query', this.defaultSearch);
    }

    if (locationByMap) {
      params = params.set('ll', `${latitude},${longitude}`);
    } else {
      params = params.set('near', near);
    }

    return this.getJson(this.proxyUrl, params).pipe(
      mergeMap(res => of(FoursquareHelper.parseVenuesRecommendations(res))),
      mergeMap(venues => this.googleService.getPlacePhotosUrls(venues))
    );
  }
}
