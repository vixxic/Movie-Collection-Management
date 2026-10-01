import "../MovieDetails/MovieDetails.css";
import { useMoviesContext } from "../../GlobalContext";

function MovieDetails({
  title,
  img,
  director,
  genre,
  year,
  rating,
  description,
}) {
  const { setSomethingCliked, setDetailsClikedId } = useMoviesContext();

  const closeDetailsModal = () => {
    setSomethingCliked(false);
    setDetailsClikedId("");
  };

  return (
    <div className="details-outer">
      <div className="details-con">
        <p className="movie-title ">{title}</p>

        <div className="details-content">
          <div className="movie-img-con">
            <img src={img} />
          </div>

          <div>
            <p>
              <span>Director: </span> {director}
            </p>
            <p>
              <span>Genre: </span> {genre}
            </p>
            <p>
              <span>Year: </span> {year}
            </p>
            <p>
              <span>Rating: </span> {rating}
            </p>
            <p>{description}</p>
          </div>
        </div>

        <div className="close-btn-con">
          <button onClick={() => closeDetailsModal()}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
