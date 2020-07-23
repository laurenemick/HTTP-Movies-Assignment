import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import UpdateForm from "./Movies/UpdateForm";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route 
        path="/movies/:id"
        render={props => <Movie {...props} movies={movieList} setMovieList={setMovieList} addToSavedList={addToSavedList} />}
      /> 

      <Route 
        path='/update-movie/:id'
        render={props => <UpdateForm {...props} movies={movieList} setMovieList={setMovieList} />} 
      />
    </>
  );
};

export default App;
