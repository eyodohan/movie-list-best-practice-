import _ from "lodash";
import React, { useEffect, useState } from "react";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    setMovies(getMovies());
    const allGenres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setGenres(allGenres);
  }, []);

  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortedColumn) => {
    setSortColumn(sortedColumn);
  };

  const filteredMoviesByGenre =
    selectedGenre && selectedGenre._id
      ? movies.filter((filtered) => filtered.genre._id === selectedGenre._id)
      : movies;

  const paginatedMovies = paginate(
    filteredMoviesByGenre,
    currentPage,
    pageSize
  );

  const sorted = _.orderBy(
    paginatedMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
        />
      </div>
      <div className="col">
        {movies.length === 0 ? (
          <p>There are no movies in the database</p>
        ) : (
          <>
            <p>Showing {paginatedMovies.length} movies in the database.</p>
            <MoviesTable
              movies={sorted}
              sortColumn={sortColumn}
              onLike={handleLike}
              onDelete={handleDelete}
              onSort={handleSort}
            />
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              itemsCount={filteredMoviesByGenre.length}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
