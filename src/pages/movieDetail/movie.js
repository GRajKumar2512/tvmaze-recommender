import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [[currentMovieDetail, movieSummary], setMovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie([data, data.summary]));
  };

  const summary = function (element) {
    const value = (document.createElement("div").innerHTML = element);
    return value;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.target.innerHTML = "";
    const markUp = `
    <h2 className="modal__header">Enjoy your show!</h2>
    `;
    e.target.insertAdjacentHTML("afterbegin", markUp);
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={currentMovieDetail ? currentMovieDetail.image.original : ""}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={currentMovieDetail ? currentMovieDetail.image.medium : ""}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.name : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.language : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail
                ? currentMovieDetail.rating.average
                : "No rating"}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.externals.thetvdb + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.premiered
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre">{genre}</span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Summary:</div>
            <div className="summary">{summary(movieSummary)}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Book your tickets:</div>
        <button className="btn--show-modal movie__Button" onClick={openModal}>
          Book
        </button>
      </div>
      <div className={`modal ${modalVisible ? "" : "hidden"}`}>
        <button className="btn--close-modal" onClick={closeModal}>
          &times;
        </button>
        <h2 className="modal__header">
          Book your tickets <br />
          in just <span className="highlight">5 minutes</span>
        </h2>
        <form className="modal__form">
          <label>First Name</label>
          <input type="text" autoFocus="autofocus" />
          <label>Last Name</label>
          <input type="text" />
          <label>Email Address</label>
          <input type="email" />
          <button className="btn" onSubmit={handleSubmit}>
            Next step &rarr;
          </button>
        </form>
      </div>
      <div
        className={`overlay ${modalVisible ? "" : "hidden"}`}
        onClick={closeModal}
      ></div>
    </div>
  );
};

export default Movie;
