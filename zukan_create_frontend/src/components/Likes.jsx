import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';

function Likes() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    client.get('/user/illustrated_books/likes')
    .then((response) => {
      setLikes(response.data)
    })
    .catch((error) => {
      console.log('API_reuest_error', error);
    });
  }, []);

  return (
    <div className='card-container'>
    <ul>
    {likes.map(like => (
      <li key={like.id} className='illustrated-book-card'>
        <p className='title'>{like.attributes.title}</p>
      </li>
    ))}
    </ul>
  </div>

  )
}

export default Likes;