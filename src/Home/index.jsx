import { useState, useEffect } from "react" 
import { Link } from "react-router-dom"
import { ApiKey } from "../Config/Key"
  
 
  
function Home () {
   const posterPathUrl = 'https://image.tmdb.org/t/p/w500'
   const [movies, setMovies] = useState([])  
   
 

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${ApiKey}&language=pt-BR&page=1`)  
         .then(response => response.json())
         .then(data => setMovies(data.results) )
    }, [] )  
    return (
        <div className="App">
            <div className="title-area">Últimos lançamentos </div>

            <ul className="movielist">
            {movies.map(movie => {
                return (
                    <li key={movie.id}>
                    <div className="poster-img">
                        <img src={`${posterPathUrl}${movie.backdrop_path}`} alt={movie.title}/>  
                        <Link to={`/more/${movie.id}`}>   <div className="icone-play"></div> </Link>
                    </div>
                    <div className="body-movie-description">
                        <h2> {movie.title} </h2>
                        <span> Lançamento em: {movie.release_date}  </span>
                    </div>
                </li>
                )
            })}

               
            </ul>
        </div>
    )
}


export default Home