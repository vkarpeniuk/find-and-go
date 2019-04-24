const https = require('https');

class HerokuKeepAlive {
  run() {
    setInterval(() => {
      var options = {
        host: 'find-and-go.herokuapp.com',
        path: '/'
      };
      https.get(options).on('error', function(err) {
        console.log('Error: ' + err.message);
      });
    }, 0.5 * 60 * 1000); // load every 20 minutes
  }
}

module.exports = HerokuKeepAlive;
