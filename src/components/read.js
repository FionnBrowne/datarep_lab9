import React from 'react';
import { Movies } from './movies';
import axios from 'axios';

export class Read extends React.Component {

    state = {
        movies: [

        ]



    };

    componentDidMount() {//component lifecycle hooks - when visiable to web api method will be exceuted
        axios.get('https://jsonblob.com/api/jsonblob/520c3b5e-0312-11eb-a6af-cbf00d776032')//asynchronous by using a promise
            .then(
                (response) => {
                    this.setState({ movies: response.data.Search })//data coming back as from the response of the web server
                }//response method
            )
            .catch((error) => {
                console.log(error)//logs error to console
            });//if things dont work catch method
    }

    render() {
        return (
            <div>
                <h1>This is the read Component.</h1>
                <Movies movies={this.state.movies}></Movies>
            </div>
        );
    }
}