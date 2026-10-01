import "../MoviesSection/MoviesSection.css";
import MovieCard from "../MovieCard/MovieCard";
import Loding from "../Loding/Loding";

import { useState, useEffect } from "react";

import { useMoviesContext } from "../../GlobalContext";

function MoviesSection() {
  const { movies, setMovies, searchInput } = useMoviesContext();

  const [loding, setLoding] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const allGenre = [];

  const getAllGenre = (movies) => {
    for (const movie of movies) {
      const genre = movie.genre.split(",");

      for (let i = 0; i < genre.length; i++) {
        const normalizedGenre = genre[i].trim().toLowerCase();

        if (!allGenre.includes(normalizedGenre)) {
          allGenre.push(normalizedGenre);
        }
      }
    }
  };

  getAllGenre(movies);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error("Gagal mengambil data movie");
        }

        const data = await response.json();

        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoding(false);
      }
    }

    getMovies();
  }, [setMovies]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleFilterGenre = (movieGenre) => {
    const filteredData = movies.filter((movie) => {
      return movie.genre
        .split(",")
        .map((genre) => genre.trim().toLowerCase())
        .includes(movieGenre.toLowerCase());
    });

    setFilteredMovies(filteredData);
  };

  const handleShowAll = () => {
    setFilteredMovies(movies);
  };

  const filteredBySearch = filteredMovies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <section className="movies-con">
      <div className="category-bar">
        <span onClick={handleShowAll}>All</span>

        {allGenre.map((genre, index) => (
          <span onClick={() => handleFilterGenre(genre)} key={index}>
            {genre}
          </span>
        ))}
      </div>

      {loding ? (
        <Loding />
      ) : (
        <div className="movies-list-grid">
          {filteredBySearch.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              director={movie.director}
              genre={movie.genre}
              releaseYear={movie.release_year}
              rating={movie.rating}
              description={movie.description}
              image={movie.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MoviesSection;
