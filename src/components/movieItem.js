import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import e from 'cors';

export class MovieItem extends React.Component {

    constructor() {
        super();
        //button needs a constructoir to bind to
        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie() {
        e.preventDefault();//makes it canceable so it doesnt allways happen when the page is opened
        console.log("Delete: " + this.props.movie._id);
        //calls localhost:4000 url
        axios.delete("http://localhost:4000/api/movies/" + this.props.movie._id)//passes up id
            .then(() => {
                this.props.ReloadData();//will call movies.js//this will then call read.js
            })
            .catch();
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.movie.poster} width="200" height="200"></img>
                            <footer className="blockquote-footer">
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>

                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>

                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>

                </Card>

            </div>
        );
    }
}