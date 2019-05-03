import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FoursquareHelper } from './helpers/foursquare-helper';
import { Venue } from './../models/venue';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService extends ApiService {
  private proxyUrl = 'api/foursquare';
  private foursquareApiUrl = 'https://api.foursquare.com/v2/';

  constructor(http: HttpClient) {
    super(http);
  }

  getVenueRecommendations(
    latitude: number = null,
    longitude: number = null,
    search: string = null,
    near: string = null,
    limit: number = 20,
    offset: number = 0
  ): Observable<Venue[]> {
    const params = new HttpParams()
      .set('requestPath', `${this.foursquareApiUrl}venues/explore`)
      .set('query', 'nightlife')
      .set('near', 'ivano-frankivsk');

    return this.get(this.proxyUrl, params).pipe(
      mergeMap(res => of(FoursquareHelper.parseVenuesRecommendations(res)))
    );
  }
}
