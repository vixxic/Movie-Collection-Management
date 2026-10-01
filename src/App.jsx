import "./App.css";

// components
import Header from "./components/Header/Header";
import MoviesSection from "./components/MoviesSection/MoviesSection";

import MovieDetails from "./components/MovieDetails/MovieDetails";
import DeleteMovie from "./components/DeleteMovie/DeleteMovie";
import AddMovieModal from "./components/AddMovieModal/AddMovieModal";
import EditMovieModal from "./components/EditMovieModal/EditMovieModal";

import { useMoviesContext } from "./GlobalContext";
import { useState } from "react";

function App() {
  const {
    movies,
    somethingCliked,
    addNewMovieCliked,
    detailsClikedId,
    editClikedId,
    deleteClikedId,
  } = useMoviesContext();

  const detailData = movies.find((movie) => movie.id == detailsClikedId);
  const editData = movies.find((movie) => movie.id == editClikedId);
  const deleteData = movies.find((movie) => movie.id == deleteClikedId);

  return (
    <section id="website-section">
      <div className="website-content">
        <Header />
        <MoviesSection />
      </div>

      {somethingCliked ? <div className="cover"></div> : ""}

      {addNewMovieCliked ? <AddMovieModal /> : ""}

      {detailData ? (
        <MovieDetails
          title={detailData.title}
          img={detailData.image}
          director={detailData.director}
          genre={detailData.genre}
          year={detailData.release_year}
          rating={detailData.rating}
          description={detailData.description}
        />
      ) : (
        ""
      )}

      {editData ? (
        <EditMovieModal
          title={editData.title}
          img={editData.image}
          director={editData.director}
          genre={editData.genre}
          year={editData.release_year}
          rating={editData.rating}
          description={editData.description}
        />
      ) : (
        ""
      )}

      {deleteData ? <DeleteMovie title={deleteData.title} /> : ""}
    </section>
  );
}

export default App;
