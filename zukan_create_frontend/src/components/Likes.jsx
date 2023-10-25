import React from 'react';
import LikeButton from './LikeButton';

function Likes({ likes }) {
  return (
    <div className='card-container'>
      <ul>
        {likes.map(like => (
          <li key={like.id} className='illustrated-book-card'>
            <p className='title'>{like.attributes.title}</p>
            <LikeButton illustratedBookId={like.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Likes;