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

//#endregion

const GoogleApiServiceModule = require('./google-api-service');
const googleApiService = new GoogleApiServiceModule(
  app.locals.googlePlacesApiKey
);

app.get('/api/google-maps-script', function(req, res, next) {
  const url = requestHelper.getGoogleMapsScriptUrl(
    req.query,
    app.locals.googleApiKey
  );
  request.get(url, (error, response, body) => {
    res
      .status(response.statusCode)
      .type('.js')
      .send(body);
  });
});

app.use('/api/foursquare', function(req, res, next) {
  req.query.client_id = app.locals.foursquareClientId;
  req.query.client_secret = app.locals.foursquareClientSecret;
  next();
});

app.get('/api/foursquare', function(req, res, next) {
  const url = requestHelper.getFoursquareRequestUrl(req.query);
  request.get(encodeURI(url), (error, response, body) => {
    const responseBodyObject = JSON.parse(body);
    res.status(responseBodyObject.meta.code).send(responseBodyObject.response);
  });
});

app.post('/api/place-photos', function(req, res, next) {
  const result = [];
  const promises = [];

  req.body.venues.forEach(venue => {
    let promise = new Promise(resolve => {
      googleApiService
        .getPlaceInfo(venue.query)
        .then(responsePlaceInfo => {
          googleApiService
            .getPlacePhoto(
              responsePlaceInfo.json.results[0].photos[0].photo_reference,
              300,
              300
            )
            .then(responsePlacePhoto => {
              result.push({
                id: venue.id,
                photoUrl:
                  'https://' +
                  responsePlacePhoto.req.socket._host +
                  responsePlacePhoto.req.path
              });
              resolve();
            })
            .catch(err => {
              console.log('getPlacePhoto error: ' + err);
            });
        })
        .catch(err => {
          console.log('getPlaceInfo error: ' + err);
        });
    });
    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    res.send(result);
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
