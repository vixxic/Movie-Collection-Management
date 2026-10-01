import "../MovieCard/MovieCard.css";
import { IoStarSharp } from "react-icons/io5";
import { useMoviesContext } from "../../GlobalContext";

function MovieCard({ id, title, director, genre, releaseYear, rating, image }) {
  const {
    setDetailsClikedId,
    setEditClikedId,
    setDeleteClikedId,
    setSomethingCliked,
  } = useMoviesContext();

  const getFeedbackAction = (action) => {
    if (action == "details") {
      setDetailsClikedId(id);
    } else if (action == "edit") {
      setEditClikedId(id);
    } else {
      setDeleteClikedId(id);
    }

    setSomethingCliked(true);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-rating-con">
        <img src={image} />
        <div className="rating">
          <IoStarSharp color="#231C6B" />
          {rating}
        </div>
      </div>

      <div className="about-the-movie-con">
        <p className="title">{title}</p>
        <p className="director-year">
          {director} • {releaseYear}
        </p>
        <div className="genre">{genre}</div>
      </div>

      <div className="action-bar">
        <button
          className="details"
          onClick={() => getFeedbackAction("details")}
        >
          Details
        </button>
        <button className="edit" onClick={() => getFeedbackAction("edit")}>
          Edit
        </button>
        <button className="delete" onClick={() => getFeedbackAction("delete")}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
