import "../AddMovieModal/AddMovieModal.css";
import { useState } from "react";
import { useMoviesContext } from "../../GlobalContext";

function AddMovieModal() {
  const { movies, setMovies, setSomethingCliked, setAddNewMovieCliked } =
    useMoviesContext();

  const [newMovieData, setNewMovieData] = useState({
    title: "",
    director: "",
    genre: "",
    release_year: null,
    rating: null,
    description: "",
    image: "",
  });

  const [error, setError] = useState("");

  async function postNewMovie() {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newMovieData,
          genre: newMovieData.genre
            .split(",")
            .map((genre) => genre.trim().toLowerCase())
            .join(", "),
        }),
      });

      const createdMovie = await response.json();

      console.log("Created movie:", createdMovie);

      setMovies([...movies, createdMovie]);

      setSomethingCliked(false);
      setAddNewMovieCliked(false);
    } catch (error) {
      console.error(error);
      setError("Movie gagal ditambahkan.");
    }
  }

  const handleAddNewMovie = (e) => {
    e.preventDefault();

    if (
      newMovieData.title.trim().length <= 0 ||
      newMovieData.director.trim().length <= 0 ||
      newMovieData.genre.trim().length <= 0 ||
      newMovieData.release_year === null ||
      String(newMovieData.release_year).length !== 4 ||
      newMovieData.rating === null ||
      newMovieData.rating < 0 ||
      newMovieData.rating > 10 ||
      newMovieData.description.trim().length <= 0 ||
      newMovieData.image.trim().length <= 0
    ) {
      setError("Pastikan semua form terisi dengan benar.");
      return;
    }

    setError("");

    postNewMovie();
  };

  const closeAddModal = () => {
    setSomethingCliked(false);
    setAddNewMovieCliked(false);
  };

  return (
    <div className="add-movie-form-outer">
      <form className="add-movie-form-con" onSubmit={handleAddNewMovie}>
        <h3>Add a movie</h3>

        <div className="form-input-con">
          <label>Title</label>

          <input
            placeholder="e.g. Interstellar"
            type="text"
            value={newMovieData.title}
            onChange={(e) =>
              setNewMovieData({
                ...newMovieData,
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="form-input-con">
          <label>Director</label>

          <input
            placeholder="e.g. Christopher Nolan"
            type="text"
            value={newMovieData.director}
            onChange={(e) =>
              setNewMovieData({
                ...newMovieData,
                director: e.target.value,
              })
            }
          />
        </div>

        <div className="horizontal">
          <div className="form-input-con">
            <label>Genre</label>

            <input
              placeholder="e.g. Sci-Fi"
              type="text"
              value={newMovieData.genre}
              onChange={(e) =>
                setNewMovieData({
                  ...newMovieData,
                  genre: e.target.value,
                })
              }
            />
          </div>

          <div className="form-input-con">
            <label>Release Year</label>

            <input
              placeholder="2014"
              type="number"
              value={newMovieData.release_year ?? ""}
              onChange={(e) =>
                setNewMovieData({
                  ...newMovieData,
                  release_year:
                    e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="form-input-con">
          <label>Rating (0 - 10)</label>

          <input
            placeholder="8.7"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={newMovieData.rating ?? ""}
            onChange={(e) =>
              setNewMovieData({
                ...newMovieData,
                rating: e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
        </div>

        <div className="form-input-con">
          <label>Description</label>

          <input
            placeholder="Movie description..."
            type="text"
            value={newMovieData.description}
            onChange={(e) =>
              setNewMovieData({
                ...newMovieData,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="image-part">
          <div className="form-input-con image-input">
            <label>Image URL</label>

            <input
              placeholder="https://image.example.com/"
              type="text"
              value={newMovieData.image}
              onChange={(e) =>
                setNewMovieData({
                  ...newMovieData,
                  image: e.target.value,
                })
              }
            />
          </div>

          <div className="img-preview-con">
            <div className="img-con">
              {newMovieData.image && (
                <img
                  src={newMovieData.image}
                  alt={newMovieData.title || "Movie preview"}
                />
              )}
            </div>
          </div>
        </div>

        <p className="add-movie-error">{error}</p>

        <div className="add-movie-form-btns-con">
          <button type="submit" className="add-btn">
            Add movie
          </button>

          <button type="button" onClick={() => closeAddModal()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovieModal;
