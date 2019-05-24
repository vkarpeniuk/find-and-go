import { Venue } from '../../models/venue.model';

export class FoursquareHelper {
  static parseVenuesRecommendations(response: any): Venue[] {
    const result: Venue[] = [];
    const recommendedGroup = response.groups.find(
      group => group.name === 'recommended'
    );
    recommendedGroup.items.forEach(item => {
      const venue = item.venue;
      const parsedVenue: Venue = {
        id: venue.id,
        name: venue.name,
        address: venue.location.address,
        city: venue.location.city,
        country: venue.location.country,
        latitude: venue.location.lat,
        longitude: venue.location.lng,
        imageUrl: null
      };

      result.push(parsedVenue);
    });

    return result;
  }
}
