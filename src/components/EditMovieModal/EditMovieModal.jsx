import "../EditMovieModal/EditMovieModal.css";
import { useState } from "react";
import { useMoviesContext } from "../../GlobalContext";

function EditMovieModal({
  title,
  img,
  director,
  genre,
  year,
  rating,
  description,
}) {
  const {
    movies,
    setMovies,
    editClikedId,
    setEditClikedId,
    setSomethingCliked,
  } = useMoviesContext();

  const [editMovieData, setEditMovieData] = useState({
    title: title || "",
    director: director || "",
    genre: genre || "",
    release_year: year ?? null,
    rating: rating ?? null,
    description: description || "",
    image: img || "",
  });

  const [error, setError] = useState("");

  const closeEditModal = () => {
    setSomethingCliked(false);
    setEditClikedId("");
  };

  async function editMovie() {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/${editClikedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editMovieData,
          genre: editMovieData.genre
            .split(",")
            .map((genre) => genre.trim().toLowerCase())
            .join(", "),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengedit movie");
      }

      const updatedMovie = await response.json();

      const newData = movies.map((movie) => {
        if (movie.id === editClikedId) {
          return updatedMovie;
        }

        return movie;
      });

      setMovies(newData);

      setSomethingCliked(false);
      setEditClikedId("");

      console.log("Movie berhasil diedit:", updatedMovie);
    } catch (error) {
      console.error(error);
      setError("Movie gagal diedit. Coba lagi.");
    }
  }

  const handleEditMovie = (e) => {
    e.preventDefault();

    if (
      editMovieData.title.trim().length <= 0 ||
      editMovieData.director.trim().length <= 0 ||
      editMovieData.genre.trim().length <= 0 ||
      editMovieData.release_year === null ||
      String(editMovieData.release_year).length !== 4 ||
      editMovieData.rating === null ||
      editMovieData.rating < 0 ||
      editMovieData.rating > 10 ||
      editMovieData.description.trim().length <= 0 ||
      !editMovieData.image.trim()
    ) {
      setError("Pastikan semua form terisi dengan benar.");
      return;
    }

    setError("");
    editMovie();
  };

  return (
    <div className="add-movie-form-outer">
      <form className="add-movie-form-con" onSubmit={handleEditMovie}>
        <h3>Edit movie</h3>

        <div className="form-input-con">
          <label>Title</label>

          <input
            placeholder="e.g. Interstellar"
            type="text"
            value={editMovieData.title}
            onChange={(e) =>
              setEditMovieData({
                ...editMovieData,
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
            value={editMovieData.director}
            onChange={(e) =>
              setEditMovieData({
                ...editMovieData,
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
              value={editMovieData.genre}
              onChange={(e) =>
                setEditMovieData({
                  ...editMovieData,
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
              value={editMovieData.release_year ?? ""}
              onChange={(e) =>
                setEditMovieData({
                  ...editMovieData,
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
            value={editMovieData.rating ?? ""}
            onChange={(e) =>
              setEditMovieData({
                ...editMovieData,
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
            value={editMovieData.description}
            onChange={(e) =>
              setEditMovieData({
                ...editMovieData,
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
              value={editMovieData.image}
              onChange={(e) =>
                setEditMovieData({
                  ...editMovieData,
                  image: e.target.value,
                })
              }
            />
          </div>

          <div className="img-preview-con">
            <div className="img-con">
              {editMovieData.image && (
                <img
                  src={editMovieData.image}
                  alt={editMovieData.title || "Movie preview"}
                />
              )}
            </div>
          </div>
        </div>

        <p className="add-movie-error">{error}</p>

        <div className="add-movie-form-btns-con">
          <button type="submit" className="add-btn">
            Save changes
          </button>

          <button type="button" onClick={closeEditModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMovieModal;
