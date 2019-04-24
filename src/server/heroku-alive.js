const http = require('http');

class HerokuKeepAlive {
  run(port) {
    setInterval(() => {
      var options = {
        host: 'find-and-go.herokuapp.com',
        port: port,
        path: '/'
      };
      http
        .get(options, function(res) {
          res.on('data', function() {});
        })
        .on('error', function(err) {
          console.log('Error: ' + err.message);
        });
    }, 0.5 * 60 * 1000); // load every 20 minutes
  }
}

module.exports = HerokuKeepAlive;
