var express = require('express');
var path = require('path');
var serveStatic = require('serve-static')
var port = process.env.PORT || 3000;
app = express();

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(serveStatic(path.join(__dirname, 'dist')));
app.get('/*', function(req, res){
  console.log('어어어엉')
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log('server started '+port);
