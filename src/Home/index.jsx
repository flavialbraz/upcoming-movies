import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import moment from "moment"


function Home() {
    const process = require('process');
    const ApiKey = process.env.KEYAPI;

    const posterPathUrl = 'https://image.tmdb.org/t/p/original'
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState({})

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}&language=pt-BR`)
            .then(response => response.json())
            .then(data => setGenres(data.genres))
    }, [])


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${ApiKey}&language=pt-BR&page=1`)
            .then(response => response.json())
            .then(data => setMovies(data.results.sort((a, b) => b.vote_average - a.vote_average)))
            .then(data => setMovies(data.results))
    }, [])


 

    function getGenres(genreIds) {
        return (
          <ul>
            {genreIds.map((id) => {
              const genre = genres.find((g) => g.id === id);
              return genre ? <li key={id}>{genre.name}</li> : null;
            })}
          </ul>
        );
      }
      

    const featuredMovie = movies.length > 0 ? movies.slice(0, 1)[0] : null;
    const otherMovies = movies.length > 0 ? movies.slice(1) : [];


    return (
        <div className="App">


            {featuredMovie && (
                <div className="featured-movie">
 
                    <div className="container">
                    <div className="welcome-message">Descubra os próximos lançamentos </div>

                        <div className="featured-movie-description">
                            <span>O mais bem avaliado: </span>
                            <div className="icone-play"></div>
                            <Link to={`/more/${featuredMovie.id}`}> <h2>{featuredMovie.title}</h2> </Link>
                            <span className="genre-movie"> {getGenres(featuredMovie.genre_ids)}  </span>
                        </div>
                    </div>

                    <img src={`${posterPathUrl}${featuredMovie.backdrop_path}`} alt={featuredMovie.title} />

                </div>
            )}



            <div className="container othermovies">
                <div className="title-area">Últimos lançamentos </div>

                <ul className="movielist">
                    {otherMovies.map(movie => {
                        return (
                            <li key={movie.id}>
                                <div className="poster-img">
                                    <img src={`${posterPathUrl}${movie.backdrop_path}`} alt={movie.title} />
                                    <Link to={`/more/${movie.id}`}>   <div className="icone-play"></div> </Link>
                                </div>
                                <div className="body-movie-description">
                                <span className="genre-movie"> {getGenres(movie.genre_ids)}  </span>

                                    <h2> {movie.title} </h2>
 
                                     <span className="release-date"> {moment(movie.release_date).format('MM/DD/YYYY')}  </span>
                                </div>
                            </li>
                        )
                    })}

                </ul>
            </div>

            <footer className="footer"> Feito com ❤  Confira os próximos lançamentos  </footer>
        </div>
    )
}


export default Home