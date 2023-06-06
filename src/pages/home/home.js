import React, { useEffect, useState } from "react";
import Cards from "../../components/card/card";
import "./home.css";

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => setAllMovies(data));
  }, []);

  return (
    <div>
      <div className="heading__app">
        <h2>Movies Recommendation App</h2>
      </div>
      <div className="list__cards">
        {allMovies.map((movie) => (
          <Cards movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default Home;
