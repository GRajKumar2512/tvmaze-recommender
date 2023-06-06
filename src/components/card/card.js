import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`movie/${movie.show.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img className="cards__img" src={movie.show.image.medium}></img>
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.show.name : ""}</div>
              <div className="card__runtime">
                {movie ? movie.show.premiered : ""}
                <span className="card__rating">
                  {movie.show.rating.average
                    ? movie.show.rating.average
                    : "no rating"}
                  <i className="fas fa-star"></i>
                </span>
              </div>
              <div className="card__description">
                {movie ? movie.show.summary.slice(0, 118) : ""}...
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
