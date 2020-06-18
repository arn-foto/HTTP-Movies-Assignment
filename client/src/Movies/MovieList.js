import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
//import axios

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }
  //create axios get request
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => this.setState({ movies: res.data }))
      .catch((err) => console.log(err.response));
  }

  // renders through the current state of the movie data and outputs a list
  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map((movie) => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
