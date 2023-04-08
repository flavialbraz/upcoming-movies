import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ApiKey } from "../Config/Key"
import moment from "moment"
import axios, { all } from "axios"

 
function Home() {
    const posterPathUrl = 'https://image.tmdb.org/t/p/w500'
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState({})
    const [featured, setFeatured] = useState([])
 
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${ApiKey}&language=pt-BR`)
         .then((response) => {
          setGenres(response.data.genres) 
      })

      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${ApiKey}&language=pt-BR&page=1`)
      .then(response => {
        
        const allFeatured = response.data.results.sort((a, b) => b.vote_average - a.vote_average)
        setFeatured(allFeatured.slice(0, 1))


        const allMovies = response.data.results.map(({title, backdrop_path, release_date, genre_ids, id}) => ({
            id,
            title,
            release_date,
            backdrop_path,
            genre_ids
          })).sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          setMovies(allMovies)
          
      })

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
      

    const featuredMovie = featured.length > 0 ? featured.slice(0, 1)[0] : null;
    const otherMovies = movies.length > 0 ? movies.slice(0) : [];


    return (
        <div className="App">

        <div className="welcome-message">Descubra os próximos lançamentos </div>
            {featuredMovie && (
                <div className="featured-movie">
  
                    
                    <img src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`} alt={featuredMovie.title} />
                        <div className="featured-movie-description">
                            <span>O mais bem avaliado: </span>
                            <Link to={`/more/${featuredMovie.id}`}>  <div className="icone-play"></div></Link>
                            <Link to={`/more/${featuredMovie.id}`}> <h2>{featuredMovie.title}</h2> </Link>
                            <span className="genre-movie"> {getGenres(featuredMovie.genre_ids)}  </span>
                        </div>
                     

                    

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
 
                                     <span className="release-date"> {moment(movie.release_date).format('DD/MM/YYYY')}  </span>
                                </div>
                            </li>
                        )
                    })}

                </ul>
            </div>

            
        </div>
    )
}


export default Home