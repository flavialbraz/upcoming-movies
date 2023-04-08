
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Cast from "../Components/Cast"
import Video from "../Components/Video"
import moment from "moment"
import { ApiKey } from "../Config/Key"
import axios from "axios"
import { Favorite } from "../Components/Favorite"

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

 
function More () {

    const posterPathUrl = 'https://image.tmdb.org/t/p/w500'
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    
 
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=pt-BR&page=1`) 
         .then(response => {
            const { title,  backdrop_path, overview, release_date} = response.data
            const movie = {
                id,
                title,
                sinopese: overview,
                release: release_date,
                image: `${posterPathUrl}${backdrop_path}`
            }  

            setMovie(movie)

         })
 
    }, [] )  

 

 
 
    return (
        <div className="container-movie">
            <div className="container-fav-and-trailer">
            <a href="/" className="back-arrow"><ArrowBackOutlinedIcon />  Trailer </a>
 
            <div className="favorite"><Favorite/> </div>
            </div>
             <Video />
            <h1>{movie.title}</h1>
            <span>Data de lançamento: {moment(movie.release).format('DD/MM/YYYY')}</span>

            <p> <strong>Sinopse: </strong> {movie.sinopese} </p>

            <div className="cast-infos">
                <Cast />
            </div>

        </div>
        
         
         
    )
}


export default More