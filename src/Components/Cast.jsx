
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiKey } from "../Config/Key"

function Cast() {
    const { id } = useParams();
    const [cast, SetCast] = useState([]);

    const profilePathUrl = 'https://image.tmdb.org/t/p/w200'

    useEffect(() => {
        fetch(`https://api.themo viedb.org/3/movie/${id}/credits?api_key=${ApiKey}`)
            .then(response => response.json())
            .then(data => {
                SetCast(data.cast)
            });
    })


    return (
        <div className="container cast">
            <div className="title-elenco">Elenco</div>
            {cast.map((person, i) => {
                return (
                    <li key={person.id}>
                        <img src={`${profilePathUrl}${person.profile_path}`} alt={`Foto do ${person.name}`} />
                        <strong>{person.name}</strong>
                    </li>
                )
            })

            }
        </div>
    )
}


export default Cast