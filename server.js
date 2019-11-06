const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

//instantiate a new express application
const app = express();

//port will be set by the host (heroku) and port 5000 for localhost
const port = process.env.PORT || 5000;

//enable to use Cross Origin Requests (i.e. communication from front end to server)
app.use(cors());
//enable app to use bodyparser and convert the requests body to JSON
app.use(bodyParser.json());
//makes sure the url strings are getting in and passed formatted correctly
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

app.get("/search/artist/:artist", (req, res) => {
    console.log("hitting search artist api");
    let uri = `https://api.deezer.com/search/artist?q=artist:"${req.params.artist}"&output=json`;

    request(uri, function (error, response, body) {
        if (response.statusCode === 200) {
            res.status(200).send(body);
        } else {
            res.status(500).send({ error: error });
        }
    });
});

app.get("/artist/:artistId/albums/index/:index", (req, res) => {
    console.log("hitting api next index uri: ", req.params.index);
    let uri = `https://api.deezer.com/artist/${req.params.artistId}/albums&index=${req.params.index}&output=json`;


    request(uri, function (error, response, body) {
        if (response.statusCode === 200) {
            res.status(200).send(body);
        } else {
            res.status(500).send({ error: error });
        }
    });
});

app.get("/album/:albumId", (req, res) => {
    var uri = `https://api.deezer.com/album/${req.params.albumId}&output=json`;

    request(uri, function (error, response, body) {
        if (response.statusCode === 200) {
            res.status(200).send(body);
        } else {
            res.status(500).send({ error: error });
        }
    });

})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, Anything that doesn't match the above, send back index.html
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}