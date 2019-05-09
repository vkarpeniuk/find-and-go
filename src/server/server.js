const express = require('express');
const path = require('path');
const request = require('request');
const HerokuKeepAlive = require('./heroku-alive');
const alive = new HerokuKeepAlive();
const RequestHelper = require('./request-helper');
const requestHelper = new RequestHelper();
const devConfigPath = '../../dist/find-and-go/dev-config.json';

const app = express();

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

app.get('/api/googleMapsScript', function(req, res, next) {
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
  request.get(url, (error, response, body) => {
    const responseBodyObject = JSON.parse(body);
    res.status(responseBodyObject.meta.code).send(responseBodyObject.response);
  });
});

// Serve only the static files form the dist directory
app.use(express.static(path.resolve(__dirname, '../../dist/find-and-go')));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/find-and-go/index.html'));
});

//keep heroku running
alive.run();

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
