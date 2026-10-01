import "../DeleteMovie/DeleteMovie.css";
import { useMoviesContext } from "../../GlobalContext";

function DeleteMovie({ title }) {
  const {
    setSomethingCliked,
    setDeleteClikedId,
    deleteClikedId,
    setMovies,
    movies,
  } = useMoviesContext();

  const closeDeletesModal = () => {
    setSomethingCliked(false);
    setDeleteClikedId("");
  };

  async function deleteMovie() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${deleteClikedId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus movie");
      }

      const newData = movies.filter((movie) => {
        return movie.id !== deleteClikedId;
      });

      setMovies(newData);
      setSomethingCliked(false);
      setDeleteClikedId("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="delete-modal-outer">
      <div className="delete-modal-con">
        <p className="movie-title">Delete this movie?</p>

        <div className="details-content">
          <p>
            are you sure you want to delete <span>"{title}"</span>? This can't
            be undone.
          </p>
        </div>

        <div className="close-delete-btn-con">
          <button onClick={closeDeletesModal}>Cancel</button>

          <button className="delete" onClick={deleteMovie}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMovie;
