const path = require('path');
const express = require('express');
const app = express();

let appPath = '';
let appFileDir = '';

const determineEnv = () => {
  appPath =  process.env.NODE_ENV === 'dev' ? '/src/index.html' : '/dist/runTimez/index.html';
  appFileDir =  process.env.NODE_ENV === 'dev' ? __dirname + '/src' : __dirname + '/dist/runTimez';
  console.log('app path is %s \n and appFileDir is %s', appPath, appFileDir);
};
determineEnv();

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
// app.use(express.static());
console.log('serving ', appFileDir);
app.use(express.static(appFileDir));
  console.log('app path ended up as ', appPath);
app.get('/', function(req, res) {  
    res.sendFile(path.join([__dirname, appPath]));
    // res.sendFile(appPath);
  });
// Start the app by listening on the default or Heroku port
app.listen(process.env.PORT || 8080);
