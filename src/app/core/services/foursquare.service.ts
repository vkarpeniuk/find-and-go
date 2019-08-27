import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { VenueDetails, Venue, VenueFilter } from '@models*';
import { GoogleService } from './google.service';
import { ApiService } from './api.service';
import { FoursquareHelper } from './helpers/foursquare-helper';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService extends ApiService {
  private proxyUrl = 'api/foursquare';

  private defaultSearch = 'top picks';

  constructor(http: HttpClient, private googleService: GoogleService) {
    super(http);
  }

  getVenueRecommendations(filter: VenueFilter): Observable<Venue[]> {
    let params = new HttpParams().set(
      'query',
      filter.search || this.defaultSearch
    );

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

    return this.getJson(`${this.proxyUrl}/explore`, params).pipe(
      map(res => FoursquareHelper.parseVenuesRecommendations(res))
    );
  }

  getVenueDetails(id: string): Observable<VenueDetails> {
    const params = new HttpParams().set('id', id);

    return this.getJson(`${this.proxyUrl}/venue-details`, params).pipe(
      map(res => FoursquareHelper.parseVenueDetails(res)),
      switchMap(venue => this.googleService.getPlaceDetails(venue))
    );
  }
}
