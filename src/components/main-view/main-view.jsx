import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      isRegistering: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://my-flix-nejla.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  setIsRegistering(status) {
    this.setState({
      isRegistering: status,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  logOut() {
    this.setState({
      selectedMovie: null,
      user: null,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      if (!this.state.isRegistering) {
        return (
          <LoginView
            onLoggedIn={(user) => this.onLoggedIn(user)}
            onRegisterClick={(status) => this.setIsRegistering(status)}
          />
        );
      } else {
        return (
          <RegistrationView
            onRegisterClick={(status) => this.setIsRegistering(status)}
          />
        );
      }

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center mt-5">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => {
                this.setSelectedMovie();
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={4} sm={6} className="mb-5">
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
        <a
          href="#"
          onClick={() => {
            this.logOut();
          }}
        >
          Log Out
        </a>
      </Row>
    );
  }
}

export default MainView;
