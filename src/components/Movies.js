import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./MoviesTable";
import SearchBar from "./SearchBar";

const Movies = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  const populateGenres = async () => {
    const { data } = await getGenres();
    const allGenres = [{ _id: "", name: "All Genres" }, ...data];
    setGenres(allGenres);
  };

  const populateMovies = async () => {
    const { data } = await getMovies();
    setMovies(data);
  };

  useEffect(async () => {
    await populateGenres();
    await populateMovies();
  }, []);

  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const newMovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
    try {
      deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted");
      setMovies(originalMovies);
    }

    console.log(movies.length);
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
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
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

  const getPagedData = () => {
    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    console.log(movies);
    console.log(filtered);

    return { totalCount: filtered.length, data: movies };
  };

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
        {user && (
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        )}
        {movies.length === 0 ? (
          <p>There are no movies in the database</p>
        ) : (
          <>
            <p>Showing {paginatedMovies.length} movies in the database.</p>
            <SearchBar value={searchQuery} onChange={handleSearch} />
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
