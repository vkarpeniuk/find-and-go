const express = require('express');
const path = require('path');
const request = require('request');
const HerokuKeepAlive = require('./heroku-alive');
const alive = new HerokuKeepAlive();
const FoursquareRequestHelper = require('./foursquare-request-helper');
const foursquareRequestHelper = new FoursquareRequestHelper();
const devConfigPath = '../../dist/find-and-go/dev-config.json';
const googleApiKey = process.env.production
  ? process.env.google_api_key
  : require(path.resolve(__dirname, devConfigPath)).googleApiKey;
const googlePlacesApiKey = process.env.production
  ? process.env.google_places_api_key
  : require(path.resolve(__dirname, devConfigPath)).googlePlacesApiKey;

const app = express();

app.use('/api/getGoogleApiKey', function(req, res, next) {
  res.send(JSON.stringify(googleApiKey));
});

app.use('/api/foursquare', function(req, res, next) {
  if (process.env.production) {
    req.query.client_id = process.env.foursquare_client_id;
    req.query.client_secret = process.env.foursquare_client_secret;
  } else {
    const devConfig = require(path.resolve(__dirname, devConfigPath));
    req.query.client_id = devConfig.foursquareClientId;
    req.query.client_secret = devConfig.foursquareClientSecret;
  }
  next();
});

app.get('/api/foursquare', function(req, res, next) {
  const url = foursquareRequestHelper.getRequestUrl(req.query);
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
