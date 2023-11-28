import { Star, StarBorder } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';

function LikeButton({ illustratedBookId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    client.get(`/user/likes/${illustratedBookId}`)
    .then((response) => {
      setLiked(response.data.likeExists);
    })
    .catch((error) => {
      console.log('liked_error', error);
    });
  }, [illustratedBookId]);

  const handleLikeClick = () => {
    client.post('/user/likes', { illustrated_book_id: illustratedBookId })
      .then(() => {
        setLiked(!liked);
      })
      .catch((error) => {
        console.error('Like_error', error);
      });
    }

    return (
      <button className='like-button' onClick={handleLikeClick}>
        {liked ? <Star /> : <StarBorder />}
      </button>
    );
  };

export default LikeButton;