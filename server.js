var express = require('express');
var path = require('path');
var serveStatic = require('serve-static')
var port = process.env.PORT || 3000;
var exphbs  = require('express-handlebars');
var axios = require('axios')

const BASE_API_URL = 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1'
// const BASE_API_URL = 'http://192.168.0.100:8888/v1'
// const BASE_API_URL = 'http://175.195.139.99:8888/v1'


// social sign up
const snsUrl = 'http://we-kin.com/'
// const snsUrl = 'http://175.195.139.99:3000/'

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

app.get('/social/naver', function(req, res){
  res.redirect(snsUrl + 'auth/kakao?code=' + req.query.code)
});

app.get('/share/doc/:doc_key', function(req, res){
  axios.get(`${BASE_API_URL}/util/share/doc/${req.params.doc_key}`)
  .then(result => {
    res.render('./../share', {
      title: result.data.content, 
      description: result.data.tags, 
      image: result.data.image_url ? result.data.image_url[0] : null,
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

app.get('/event/share/invite-friend/:user_key', function(req, res){
  axios.get(`${BASE_API_URL}/util/share/user/${req.params.user_key}`)
    .then(result => {
      res.render('./../share', {
        title: '여가생활? 위킨(WE:KIN)과 함께!', 
        description: result.data.name + '님과 편하게 여가생활 하세요! 지금 가입하면 상품이 펑펑!', 
        image: 'https://firebasestorage.googleapis.com/v0/b/wekin-9111d.appspot.com/o/test%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202018-02-20%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.22.38.png?alt=media&token=184e96d1-ac79-4a58-9c82-769596b32f75',
        redirectUrl: `/event/invite-friend/${req.params.user_key}`
      })
    })
    .catch(error => console.log(error))
});

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);

console.log('server started '+port);
