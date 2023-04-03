
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiKey } from "../Config/Key"
import axios from "axios";


function Cast() {

    const { id } = useParams();
    const [cast, SetCast] = useState([]);

    const profilePathUrl = 'https://image.tmdb.org/t/p/w200'

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${ApiKey}`)
        .then(response => {
            SetCast(response.data.cast)
        })
            
    },[])


    return (
        <ul className="container cast">
            <div className="title-elenco">Elenco</div>
            {cast.slice(0, 12).map((person, i) => {
                return (
                    <li key={person.id}>
                        <img src={`${profilePathUrl}${person.profile_path}`} alt={`Foto do ${person.name}`} />
                        <strong>{person.name}</strong>
                        <p>{person.character !== "" ? person.character : "Figurante"}</p>
                    </li>
                )
            })

            }
        </ul>
    )
}


export default Cast