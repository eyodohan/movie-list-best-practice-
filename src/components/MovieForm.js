import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Joi from "joi-browser";
import Input from "../common/Input";
// import { saveMovie } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/movieService";
import Select from "../common/Select";
import { getGenres } from "../services/genreService";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  const populateGenres = async () => {
    const { data: genre } = await getGenres();
    setGenres(genre);
  };

  const populateMovie = async () => {
    try {
      const movieId = id;
      if (location.pathname === "/movies/new") return;
      const { data: movie } = await getMovie(movieId);
      const newData = mapToViewModel(movie);
      setData(newData);
    } catch (error) {
      if (error.response && error.response.status === 404)
        navigate("/not-found", { replace: true });
    }
  };

  useEffect(async () => {
    await populateGenres();
    await populateMovie();
  }, []);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const validateProperty = (input) => {
    const obj = { [input.name]: input.value };
    const subSchema = { [input.name]: schema[input.name] };
    const result = Joi.validate(obj, subSchema);
    if (result.error) return result.error.details[0].message;
    else return null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(data, schema, options);
    // console.log(result);
    const newError = { ...errors };
    if (!result.error) return null;

    result.error.details.map((item) => (newError[item.path[0]] = item.message));
    // console.log(newError);
    return newError;
  };
  const disabled = validate();

  const handleChange = ({ target: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = validate();
    // console.log(newError);
    if (newError) return setErrors(newError);

    await doSubmit();
  };

  const doSubmit = async () => {
    await saveMovie(data);
    navigate("/movies");
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          type="text"
          error={errors?.title}
          value={data.title}
          onChange={handleChange}
        />
        <Select
          name="genreId"
          label="Genre"
          value={data?.genreId}
          options={genres}
          error={errors?.genreId}
          onChange={handleChange}
        />
        <Input
          name="numberInStock"
          label="Number In Stock"
          type="number"
          error={errors?.numberInStock}
          value={data.numberInStock}
          onChange={handleChange}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          type="number"
          error={errors?.dailyRentalRate}
          value={data.dailyRentalRate}
          onChange={handleChange}
        />
        <button className="btn btn-primary" disabled={disabled}>
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
