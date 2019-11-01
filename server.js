const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

//if (process.env !== 'production') {
//    require('dotenv'.config());
//}

//instantiate a new express application
const app = express();

//port will be set by the host (heroku) and port 5000 for localhost
const port = process.env.PORT || 5000;

//enable app to use bodyparser and convert the requests body to JSON
app.use(bodyParser.json());
//makes sure the url strings are getting in and passed formatted correctly
app.use(bodyParser.urlencoded({ extended: true }));
//enable to use Cross Origin Requests (i.e. communication from front end to server)
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

app.get("/search/:artist", (req, res) =>{
    //var q = `https://api.deezer.com/search/artist?q=${req.params.artist}&limit=1&output=json`;
    var q = `https://api.deezer.com/search?q=artist:"${req.params.artist}"&output=json`;
    request(q, function (error, response, body) {
        if(response.statusCode === 200){
            res.status(200).send(body);
        }else{
            res.status(500).send({error: error});
        }
    });
});