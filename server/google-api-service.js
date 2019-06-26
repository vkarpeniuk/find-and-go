class GoogleApiService {
  constructor(placesApiKey) {
    this.googleMapsClient = require('@google/maps').createClient({
      key: placesApiKey,
      Promise: Promise
    });
  }

  getPlaceDetails(id) {
    return this.googleMapsClient
      .place({
        placeid: id,
        fields: ['photo', 'review']
      })
      .asPromise();
  }

  getPlacesByQuery(searchQuery) {
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

  getPlaceDetailsById(placeId) {
    const result = { photos: [], reviews: [] };
    const promises = [];

    return this.getPlaceDetails(placeId)
      .then(placeDetails => {
        return {
          photos: placeDetails.json.result.photos,
          reviews: placeDetails.json.result.reviews
        };
      })
      .then(detailsResult => {
        result.reviews = detailsResult.reviews;
        const photos = detailsResult.photos.map(photoObj => {
          return {
            photoReference: photoObj.photo_reference,
            height: photoObj.height,
            width: photoObj.width
          };
        });
        photos.forEach(photo => {
          const promise = new Promise(resolve => {
            this.getPlacePhoto(
              photo.photoReference,
              photo.width,
              photo.height
            ).then(photo => {
              result.photos.push(photo);
              resolve();
            });
          });
          promises.push(promise);
        });

        return Promise.all(promises);
      })
      .then(() => {
        return result;
      });
  }
}

module.exports = GoogleApiService;
