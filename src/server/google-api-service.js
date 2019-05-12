class GoogleApiService {
  constructor(placesApiKey) {
    this.googleMapsClient = require('@google/maps').createClient({
      key: placesApiKey,
      Promise: Promise
    });
  }

  getPlaceInfo(searchQuery) {
    return this.googleMapsClient
      .places({
        query: searchQuery
      })
      .asPromise();
  }

  getPlacePhoto(photoRef, maxwidth, maxheight) {
    return this.googleMapsClient
      .placesPhoto({
        photoreference: photoRef,
        maxwidth: maxwidth,
        maxheight: maxheight
      })
      .asPromise();
  }
}

module.exports = GoogleApiService;
