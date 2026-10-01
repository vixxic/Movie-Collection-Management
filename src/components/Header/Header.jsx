import "../Header/Header.css";
import { useMoviesContext } from "../../GlobalContext";

function Header() {
  const {
    setAddNewMovieCliked,
    setSomethingCliked,
    searchInput,
    setSearchInput,
  } = useMoviesContext();

  return (
    <section id="header-section">
      <div className="header-title">
        My <span className="movie-tag-title">Movie</span> Shelf
      </div>

      <div className="des-and-add-btn">
        <div>
          <p className="website-des">
            Keep track of everything you've watched and loved.
          </p>
        </div>
        <div className="add-btn-con">
          <button
            onClick={() => {
              setAddNewMovieCliked(true);
              setSomethingCliked(true);
            }}
          >
            + Add movie
          </button>
        </div>
      </div>

      <div className="search-filter-con">
        <div className="search-input-con">
          <input
            placeholder="Search by title or director..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>

        <div className="filter-con">any rating</div>
      </div>
    </section>
  );
}

export default Header;
