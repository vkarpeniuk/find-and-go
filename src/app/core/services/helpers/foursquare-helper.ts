import { Venue, VenueDetails } from '@models';

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

  static parseVenueDetails(response: any): VenueDetails {
    const venue = response.venue;
    const result: VenueDetails = {
      categories: venue.categories.map(category => {
        return {
          name: category.name,
          icon: `${category.icon.prefix}bg_88${category.icon.suffix}`
        };
      }),
      facebookName: venue.contact.facebookName,
      phone: venue.contact.formattedPhone,
      twitter: venue.contact.twitter,
      isOpen: venue.hours
        ? venue.hours.isOpen
        : venue.popular
        ? venue.popular.isOpen
        : null,
      status: venue.hours
        ? venue.hours.status
        : venue.popular
        ? venue.popular.status
        : null,
      id: venue.id,
      likes: venue.likes.count,
      address: venue.location.address,
      city: venue.location.city,
      country: venue.location.country,
      name: venue.name,
      photos: [],
      price: venue.price ? venue.price.tier : null,
      rating: venue.rating,
      tipsCount: venue.tips.count,
      tips: [],
      url: venue.url
    };

    return result;
  }

  static getRadiusByZoomLevel(zoomLevel: number): number {
    if (zoomLevel < 7) {
      return 100000;
    } else if (zoomLevel === 8) {
      return 80000;
    } else if (zoomLevel === 9) {
      return 60000;
    } else if (zoomLevel === 10) {
      return 25000;
    } else if (zoomLevel === 11) {
      return 15000;
    } else if (zoomLevel === 12) {
      return 7000;
    } else if (zoomLevel === 13) {
      return 5000;
    } else if (zoomLevel === 14) {
      return 3000;
    } else if (zoomLevel === 15) {
      return 2000;
    } else {
      return 1000;
    }
  }
}
