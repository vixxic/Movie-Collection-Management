import { createContext, useContext, useState } from "react";

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [somethingCliked, setSomethingCliked] = useState(false);

  const [addNewMovieCliked, setAddNewMovieCliked] = useState(false);
  const [detailsClikedId, setDetailsClikedId] = useState("");
  const [editClikedId, setEditClikedId] = useState("");
  const [deleteClikedId, setDeleteClikedId] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const value = {
    movies,
    setMovies,

    somethingCliked,
    setSomethingCliked,

    addNewMovieCliked,
    setAddNewMovieCliked,

    detailsClikedId,
    setDetailsClikedId,

    editClikedId,
    setEditClikedId,

    deleteClikedId,
    setDeleteClikedId,

    searchInput,
    setSearchInput,

    ratingFilter,
    setRatingFilter,
  };
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

export function useMoviesContext() {
  return useContext(MoviesContext);
}
