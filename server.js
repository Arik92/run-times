const path = require('path');
const express = require('express');
let compression = require('compression');

const app = express();

// const determineEnv = () => {
//   appPath =  process.env.NODE_ENV === 'dev' ? '/src/index.html' : '/dist/runTimez/index.html';
//   appFileDir =  process.env.NODE_ENV === 'dev' ? __dirname + '/src' : __dirname + '/dist/runTimez';
//   console.log('app path is %s \n and appFileDir is %s', appPath, appFileDir);
// };
// determineEnv();

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
  
  // forceSSL middleware
  // app.use(forceSSL());
  app.use(compression());
app.use(express.static(__dirname + '/dist/runTimez'));
// app.use(express.static(__dirname + '/src'));
console.log('testing env? ', process.env.NODE_ENV);
// app.get('/*', function(req, res) {
//   const appPath = __dirname + process.env.NODE_ENV === 'dev' ? '/src/index.html' : '/dist/runTimez/index.html';
//     res.sendFile(path.join(appPath));
//   });
// Start the app by listening on the default or Heroku port
app.listen(process.env.PORT || 8080);
