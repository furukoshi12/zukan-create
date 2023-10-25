import React from 'react';
import LikeButton from './LikeButton';

function MyIllustratedBooks({ illustratedBooks }) {
  return (
    <div className='card-container'>
      <ul>
        {illustratedBooks.map(illustratedBook => (
          <li key={illustratedBook.id} className='illustrated-book-card'>
            <p className='title'>{illustratedBook.attributes.title}</p>
            <LikeButton illustratedBookId={illustratedBook.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyIllustratedBooks;