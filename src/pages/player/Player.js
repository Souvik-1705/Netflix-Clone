import React, { useEffect, useState } from 'react';
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import "./Player.css";
import { useNavigate, useParams } from 'react-router-dom';

function Player() {
  const {id}=useParams();
  const navigate=useNavigate();
  const[apiData,setApiData]=useState({name:"",key:"",published_at:"",typeof:""});
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODhkYzA4Mzk5MmI4NjY4ODkwODVjNmE2ODg4NDI5ZiIsIm5iZiI6MTc0NjY0MDY3Ni44OTkwMDAyLCJzdWIiOiI2ODFiOWYyNGMxYTNlMmJkZTdlNjY3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6qkczX2LwPIpsqo5s8FtPFkMb1VBY0RS_s0euO1jk1k'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));

  }, [])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={()=>navigate(-2)}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title='tariler' frameBorder='0' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  )
}

export default Player;