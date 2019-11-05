const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

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
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, Anything that doesn't match the above, send back index.html
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

app.get("/search/:artist", (req, res) =>{
    let q = `https://api.deezer.com/search?q=artist:"${req.params.artist}"&output=json`;

    request(q, function (error, response, body) {
        if(response.statusCode === 200){
            res.status(200).send(body);
        }else{
            res.status(500).send({error: error});
        }
    });
});

app.get("/search/:artist/:limit", (req,res) =>{
    let q = `https://api.deezer.com/search?q=artist:"${req.params.artist}"&output=json&limit=${req.params.limit}`;

    request(q, function (error, response, body) {
        if(response.statusCode === 200){
            res.status(200).send(body);
        }else{
            res.status(500).send({error: error});
        }
    });
});

app.get("/album/:albumId", (req, res) => {
    var q = `https://api.deezer.com/album/${req.params.albumId}&output=json`;

    request(q, function(error, response, body){
        if(response.statusCode === 200){
            res.status(200).send(body);
        }else{
            res.status(500).send({error: error});
        }
    });

})