import React, { useEffect, useRef, useState } from 'react';
import cards_data from "../../assets/cards/Cards_data";
import "./TitleCards.css";
import { Link } from 'react-router-dom';


function TitleCards({ title, category }) {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODhkYzA4Mzk5MmI4NjY4ODkwODVjNmE2ODg4NDI5ZiIsIm5iZiI6MTc0NjY0MDY3Ni44OTkwMDAyLCJzdWIiOiI2ODFiOWYyNGMxYTNlMmJkZTdlNjY3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6qkczX2LwPIpsqo5s8FtPFkMb1VBY0RS_s0euO1jk1k'
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category: "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel)
  }, [])
  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`}className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt='' />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards;