var express = require('express');
var path = require('path');
var serveStatic = require('serve-static')
var port = process.env.PORT || 3000;
var exphbs  = require('express-handlebars');
var axios = require('axios')

// const BASE_API_URL = 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1'
const BASE_API_URL = 'http://192.168.0.100:8888/v1'

app = express();

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('/share/doc/:doc_key', function(req, res){
  axios.get(`${BASE_API_URL}/util/share/doc/${req.params.doc_key}`)
  .then(result => {
    res.render('./../share', {
      title: result.data.content, 
      description: result.data.tags, 
      image: result.data.image_url[0],
      redirectUrl: `/feed/${req.params.doc_key}`
    })
  })
  .catch(error => console.log(error))
});

app.get('/share/:activity_key', function(req, res){
  axios.get(`${BASE_API_URL}/util/share/${req.params.activity_key}`)
  .then(result => {
    res.render('./../share', {
      title: result.data.title, 
      description: result.data.detail_question.question1.text, 
      image: result.data.main_image.image[0],
      redirectUrl: `/activity/${req.params.activity_key}`
    })
  })
  .catch(error => console.log(error))
});

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log('server started '+port);
