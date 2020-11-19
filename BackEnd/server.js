//have to install cored on the server. first stop program running
const express = require('express')
const app = express()
const port = 4000//so it wont collide with other local server
const cors = require('cors');//including cors
const bodyParser = require("body-parser");//allows to intercept body of a http message
const mongoose = require('mongoose');

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//replace password and put in database name
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.r2xtn.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String

});

var MovieModel = mongoose.model("movie", movieSchema);

app.get('/api/movies', (req, res) => {

    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "World War Z",
    //         "Year": "2013",
    //         "imdbID": "tt0816711",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "War of the Worlds",
    //         "Year": "2005",
    //         "imdbID": "tt0407304",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
    //     }
    // ];//all hardcoded to object and will be passed to the server
    //find all documents in database
    MovieModel.find((err, data) => {
        res.json(data);
    })

    // res.status(200).json({
    //     message: "Everything is ok", //passing a string// more data could also be put in
    //     movies: mymovies
    // });

})
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);//logs to console

    MovieModel.findById(req.params.id, (err, data) => {
        //if data found send it back
        res.json(data);
    })
})


app.post('/api/movies', (req, res) => {//method loads data from the server using a HTTP POST request.
    console.log('Movie Recieved!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    });
    res.send('Item Added');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})