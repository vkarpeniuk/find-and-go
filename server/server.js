const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const HerokuKeepAlive = require('./heroku-alive');
const alive = new HerokuKeepAlive();
const RequestHelper = require('./request-helper');
const requestHelper = new RequestHelper();
const devConfigPath = '../dist/find-and-go/dev-config.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//#region keys

app.locals.googleApiKey = process.env.production
  ? process.env.google_api_key
  : require(path.resolve(__dirname, devConfigPath)).googleApiKey;

app.locals.googlePlacesApiKey = process.env.production
  ? process.env.google_places_api_key
  : require(path.resolve(__dirname, devConfigPath)).googlePlacesApiKey;

app.locals.foursquareClientId = process.env.production
  ? process.env.foursquare_client_id
  : require(path.resolve(__dirname, devConfigPath)).foursquareClientId;

app.locals.foursquareClientSecret = process.env.production
  ? process.env.foursquare_client_secret
  : require(path.resolve(__dirname, devConfigPath)).foursquareClientSecret;

app.locals.foursquareApiUrl = process.env.production
  ? process.env.foursquare_api_url
  : require(path.resolve(__dirname, devConfigPath)).foursquareApiUrl;

app.locals.foursquareApiVersion = process.env.production
  ? process.env.foursquare_api_version
  : require(path.resolve(__dirname, devConfigPath)).foursquareApiVersion;

app.locals.foursquareApiVersionDate = process.env.production
  ? process.env.foursquare_api_version_date
  : require(path.resolve(__dirname, devConfigPath)).foursquareApiVersionDate;

//#endregion

const GoogleApiServiceModule = require('./google-api-service');
const googleApiService = new GoogleApiServiceModule(
  app.locals.googlePlacesApiKey
);

app.get('/api/google-maps-script', function(req, res, next) {
  request.get(
    `${req.query.url}&key=${app.locals.googleApiKey}`,
    (error, response, body) => {
      res
        .status(response.statusCode)
        .type('.js')
        .send(body);
    }
  );
});

app.use('/api/foursquare', function(req, res, next) {
  req.query.client_id = app.locals.foursquareClientId;
  req.query.client_secret = app.locals.foursquareClientSecret;
  req.query.v = app.locals.foursquareApiVersionDate;
  next();
});

app.get('/api/foursquare/venue-details', function(req, res, next) {
  let url = `${app.locals.foursquareApiUrl}/${app.locals.foursquareApiVersion}/venues/${req.query.id}?`;
  delete req.query.id;
  url += requestHelper.getQueryParamsString(req.query);
  request.get(encodeURI(url), (error, response, body) => {
    const responseBodyObject = JSON.parse(body);
    res.status(responseBodyObject.meta.code).send(responseBodyObject.response);
  });
});

app.get('/api/foursquare/explore', function(req, res, next) {
  const url =
    `${app.locals.foursquareApiUrl}/${app.locals.foursquareApiVersion}/venues/explore?` +
    requestHelper.getQueryParamsString(req.query);
  request.get(encodeURI(url), (error, response, body) => {
    const responseBodyObject = JSON.parse(body);
    res.status(responseBodyObject.meta.code).send(responseBodyObject.response);
  });
});

app.post('/api/place-photos', function(req, res, next) {
  const result = {};
  const promises = [];

  req.body.venues.forEach(venue => {
    let promise = new Promise(resolve => {
      googleApiService
        .getPlacesByQuery(venue.query)
        .then(responsePlaceInfo => {
          if (
            responsePlaceInfo.json.results &&
            responsePlaceInfo.json.results.length &&
            responsePlaceInfo.json.results[0].photos &&
            responsePlaceInfo.json.results[0].photos.length
          ) {
            googleApiService
              .getPlacePhoto(
                responsePlaceInfo.json.results[0].photos[0].photo_reference,
                300,
                300
              )
              .then(responsePlacePhoto => {
                result[venue.id] =
                  'https://' +
                  responsePlacePhoto.req.socket._host +
                  responsePlacePhoto.req.path;
                resolve();
              })
              .catch(err => {
                console.log('getPlacePhoto error: ' + err);
                resolve();
              });
          } else {
            resolve();
          }
        })
        .catch(err => {
          console.log('getPlacesByQuery error: ' + err);
          resolve();
        });
    });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    res.send(result);
  });
});

app.get('/api/place-details', function(req, res, next) {
  googleApiService.getPlacesByQuery(req.query.searchQuery).then(places => {
    if (places.json.results.length) {
      googleApiService
        .getPlaceDetailsById(places.json.results[0].place_id)
        .then(details => {
          const result = {
            photos: details.photos.map(
              photo => `https://${photo.req.socket._host}${photo.req.path}`
            ),
            tips: details.reviews
          };
          res.send(result);
        });
    } else {
      const result = {
        photos: [],
        tips: []
      };
      res.send(result);
    }
  });
});

// Serve only the static files form the dist directory
app.use(express.static(path.resolve(__dirname, '../dist/find-and-go')));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/find-and-go/index.html'));
});

//keep heroku running
alive.run();

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
