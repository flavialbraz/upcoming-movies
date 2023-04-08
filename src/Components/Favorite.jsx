import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useEffect, useState } from 'react';

export function Favorite() {
    const [favorited, setFavorited] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
 

    // useEffect(() => {
    //     setTimeout(() => {
    //         (<div className="saved-mesg"> Adicionado ao favorito 
    //         <button onClick={() => handeleFavorited()}> Desfazer </button> 
    //        </div>)
    //     }, 200 )
    // }, [favorited])


    useEffect(() => {
        let timerId;
        if (favorited) {
          timerId = setTimeout(() => {
            setShowSavedMessage(false);
          }, 3000);
        }
        return () => clearTimeout();
      }, [showSavedMessage]);


      function handeleFavorited () {
        setFavorited(!favorited);

        if(!favorited) {
            setShowSavedMessage(true);
        }  
    }

    return (
        <>
        <button
        onClick={() => handeleFavorited()}

         className="heart-icons">
            {
                favorited ? <FavoriteOutlinedIcon className='favorited-true'/>  :  <FavoriteBorderOutlinedIcon />
            }
            
        </button>

  
        { showSavedMessage  && (
            <div className="saved-mesg"> Adicionado ao favorito 
            <button onClick={() => handeleFavorited()}> Desfazer </button> 
           </div>
        )}


      </>   
    )
}