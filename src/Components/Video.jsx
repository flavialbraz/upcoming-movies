
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiKey } from "../Config/Key"
 
function Video () {

    const videoPathUrl = 'https://www.youtube.com/embed/'
    const { id } = useParams()
    const [videomovie, setVideomovie] = useState([])  
    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=pt-BR`)  
         .then(response => response.json())
         .then(data => {
            
            setVideomovie(data.results [0]);
 
         })
    }, [id] )
  

    
    return (
        <div className="video-trailer">

        {videomovie && (
             <iframe width="800" height="400" src={`${videoPathUrl}${videomovie.key}`}> 
             </iframe>        
        )}
        </div>
    )
}



export default Video