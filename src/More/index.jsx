
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Cast from "../Components/Cast"
import Video from "../Components/Video"
import { ApiKey } from "../Config/Key"
 

 
function More () {
    const posterPathUrl = 'https://image.tmdb.org/t/p/w500'
    const { id } = useParams()
    const [movie, setMovie] = useState({})  
    
 
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=pt-BR&page=1`) 
         .then(response => response.json())
         .then(data => {
          
            const { title,  backdrop_path, overview, release_date} = data
            const movie = {
                id,
                title,
                sinopese: overview,
                release: release_date,
                image: `${posterPathUrl}${backdrop_path}`
            }  

            setMovie(movie)

         } )
    }, [id] )  

 
    return (
        <div className="container-movie">
            <a href="/" className="back-arrow">   </a>
             <Video />
            <h1>{movie.title}</h1>
            <span>Data de lançamento: {movie.release}</span>

            <p> {movie.sinopese} </p>

            <div className="cast-infos">
                    <Cast />
            </div>

        </div>
         
         
    )
}


export default More