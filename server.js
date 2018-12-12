const path = require('path');
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used

const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
         ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  }
  // Instruct the app
  // to use the forceSSL
  // middleware
  // app.use(forceSSL());
app.use(express.static(__dirname + '/dist/runTimez'));
// app.use(express.static(__dirname + '/src'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/runTimez/index.html'));
    // res.sendFile(path.join(__dirname + '/src/index.html'));
  });
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);