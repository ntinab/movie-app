import { setMoviesListRDX, setTotalItems } from '../redux/reducer'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const MoviesUploader = () => {

  const dispatch = useDispatch();
  const backendApiUrl = 'https://localhost:7195'; 

  const uploadMovies = (movies) => {
       fetch(`${backendApiUrl}/movies`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ movies }), 
       })
         .then((res) => {
           if (res.ok) {
             console.log('Movies uploaded successfully.');
           } else {
             console.error('Failed to upload movies to the backend.');
           }
         })
         .catch((error) => {
           console.error('Error uploading movies:', error);
         });
     };   

  useEffect(() => {
    const fetchMoviesFromFrontend = async () => {
      try {
        const res = await fetch('http://localhost:3000');
        if (res.ok) {
          const data = await res.json();
          const movies = data.movies;
          dispatch(setMoviesListRDX(movies));
          dispatch(setTotalItems(movies.length)); 
          uploadMovies(movies);
        } else {
          console.error('Failed to fetch movies from the frontend API.');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };  
    fetchMoviesFromFrontend();
  }, [dispatch]);
};

export default MoviesUploader;