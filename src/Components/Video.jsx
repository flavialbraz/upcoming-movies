
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiKey } from "../Config/Key"
 
function Video () {

    const videoPathUrl = 'https://www.youtube.com/embed/'
    const { id } = useParams()
    const [videomovie, setVideomovie] = useState([])  
    

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`)  
         .then(response => response.json())
         .then(data => {
            setVideomovie(data.results) 
            
        
 
         })
    }, [id] )
  

   

    return (
        <div className="video-trailer">


            {videomovie.map(video => {
                return (
                <li key={video.id}>      
                   <iframe width="800" height="320" src={`${videoPathUrl}${video.key}`}> </iframe>                
                </li>
                
                )
            })}

 

        </div>
    )
}



export default Video