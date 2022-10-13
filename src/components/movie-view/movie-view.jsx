import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Button from "react-bootstrap/Button";
import { Button, Row } from "react-bootstrap";
import "./movie-view.scss";

import { Link } from "react-router-dom";

export function MovieView({ movie, onBackClick }) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getFavoriteMoviesArray = (username) => {
    axios
      .get(`${process.env.MY_FLIX_API}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  const addMovieToFavorites = (username, movieId) => {
    axios
      .post(`${process.env.MY_FLIX_API}/users/${username}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  const removeMovieFromFavorites = (username, movieId) => {
    axios
      .delete(
        `${process.env.MY_FLIX_API}/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getFavoriteMoviesArray(currentUser);
  }, []);

  return (
    <div className="movie-view">
      <Button
        className="pl-0 backLink"
        onClick={() => onBackClick()}
        variant="link"
      >
        Back
      </Button>
      <div className="movie-poster pb-3">
        <img width="150" src={movie.ImagePath} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <Row className="mx-0">
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button className="pl-0 directorLink" variant="link">
            Director
          </Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button className="genreLink" variant="link">
            Genre
          </Button>
        </Link>
      </Row>
      <Row className="mx-0">
        {favoriteMovies.includes(movie._id) ? (
          <Button
            variant="warning"
            onClick={() => removeMovieFromFavorites(currentUser, movie._id)}
          >
            Remove from favorites
          </Button>
        ) : (
          <Button
            variant="info"
            onClick={() => addMovieToFavorites(currentUser, movie._id)}
          >
            Add to favorites
          </Button>
        )}
      </Row>
    </div>
  );
}
