import React from 'react';
import LikeButton from './LikeButton';
import client from '../lib/api/client';
import { Delete } from '@mui/icons-material';

function MyIllustratedBooks({ illustratedBooks }) {
  const handleDelete = (illustratedBookId) => {
    client.delete(`/user/illustrated_books/${illustratedBookId}`)
    .then(() =>{
      window.location.reload();
    })
    .catch (error => {
      console.error("削除中にエラーが発生しました: ", error);
    });
  }
  
  return (
    <div className='card-container'>
      <ul>
        {illustratedBooks.map(illustratedBook => (
          <li key={illustratedBook.id} className='illustrated-book-card'>
            <p className='title'>{illustratedBook.attributes.title}</p>
            <p className='tag'>{illustratedBook.attributes.tags}</p>
            <LikeButton illustratedBookId={illustratedBook.id}/>
            <button type="submit" onClick={() => handleDelete(illustratedBook.id)}>
              <Delete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyIllustratedBooks;