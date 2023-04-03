
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiKey } from "../Config/Key"



function Video() {
    const videoPathUrl = 'https://www.youtube.com/embed/'
    const { id } = useParams()
    const [videomovie, setVideomovie] = useState([])
    const [videoFound, setVideoFound] = useState(true)



    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                const teaserVideo = data.results.find(video => video.type === "Trailer")
                if (teaserVideo) {
                    setVideomovie(teaserVideo)
                } else {
                    setVideoFound(false)
                }
            })
    }, [])


    return (
        <div className="video-trailer">
            {videomovie && videomovie.key && (
                <iframe width="800" height="400" src={`${videoPathUrl}${videomovie.key}`}>
                </iframe>
            )}
              {!videoFound && <p> Ops, esse filme ainda não possui trailer disponível.</p>}
        </div>
    )
}



export default Video