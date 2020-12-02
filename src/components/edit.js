import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {//displayed by app.js

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    componentDidMount() {
        console.log(this / this.props.match.params.id);//logs id to console

        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)//asynchronious call to server
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Title: response.data.title,//lower case on the server
                    Year: response.data.year,
                    Poster: response.data.poster
                })//this will invoke get request in server.js
            })
            .catch((error) => {
                console.log(error);
            });
    }
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        });
    }

    onChangePoster(e) {
        this.setState({
            Poster: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();//prevent from being called multiple times
        alert("Movie: " + this.state.Title + " Year: " + this.state.Year + " Poster: " + this.state.Poster);//shows if button works

        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster,
            _id: this.state._id
        }//passing objects up as lowercase because server.js is looking for them in that case

        axios.put('http://localhost:4000/api/movies' + this.state._id, newMovie)
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });

        //axios.post('http://localhost:4000/api/movies', newMovie)//talks in http to send data to the server//returns promise asyncronisly
        //    .then((res) => {
        //        console.log(res);
        //    })
        //    .catch((err) => {
        //        console.log(err);
        //    });
    }

    render() {
        //first div = //input control
        //last div = //button
        return (
            <div className='App'>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type='text' className='form-control'
                            value={this.state.Title}
                            onChange={this.onChangeTitle}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type='text' className='form-control'
                            value={this.state.Year}
                            onChange={this.onChangeYear}>
                        </input>
                    </div>

                    <div className="form-group">
                        <label>Movies Poster: </label>
                        <textarea type='text' className='form-control'
                            value={this.state.Poster}
                            onChange={this.onChangePoster}>
                        </textarea>

                    </div>

                    <div className="form-group">
                        <input type='submit'
                            value='Edit Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>//when button is pressed will execute on submit method
        );
    }
}