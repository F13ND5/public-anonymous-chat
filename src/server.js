var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

const APP_ID = '1657589';
const APP_KEY = '4c10ca6bca108226474e';
const APP_SECRET = 'c6d11bc58f12333421d6';
const APP_CLUSTER = 'eu';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var pusher = new Pusher({
    appId: '1657589',
    key: '4c10ca6bca108226474e',
    secret: 'c6d11bc58f12333421d6',
    cluster: 'eu'   
});

app.post('/message', function(req, res) {
    var message = req.body.message;
    pusher.trigger('public-chat', 'message-added', {message});
    res.sendStatus(200);
});

app.get('/', function(req, res) {
    res.sendFile('public/index.html', {root: __dirname})
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`app listening on port ${port}!`)
});
