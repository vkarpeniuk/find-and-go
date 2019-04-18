const express = require('express');
const path = require('path');

const app = express();

app.use('/getGoogleApiKey', function(req, res, next) {
  let result = process.env.google_api_key;
  res.send(JSON.stringify(result));
});

app.use('/getDevGoogleApiKey', function(req, res, next) {
  const devConfig = require(path.resolve(
    __dirname,
    '../../dist/find-and-go/dev-config.json'
  ));
  let result = devConfig.googleApiKey;
  res.send(JSON.stringify(result));
});

// Serve only the static files form the dist directory
app.use(express.static(path.resolve(__dirname, '../../dist/find-and-go')));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../../dist/find-and-go/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
