import React from 'react';
import LikeButton from './LikeButton';
import client from '../lib/api/client';
import { Delete } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import defaultImagePath from '../images/default.webp'

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
    <>
      <ul className='grid'>
        {illustratedBooks.map(illustratedBook => (
          <li key={illustratedBook.id} className='illustrated-book-card'>
            <Box>
              <img src={illustratedBook.attributes.image.url || defaultImagePath} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              <p className='title'>{illustratedBook.attributes.title}</p>
            </Box>
            <div className="tags">
                {illustratedBook.attributes.tags.map((tag, index) => (
                  <p key={index} className='tag'>#{tag}</p>
                ))}
              </div>
            <div className='card-actions'>
            <LikeButton illustratedBookId={illustratedBook.id}/>
            <IconButton type="submit" onClick={() => handleDelete(illustratedBook.id)}>
              <Delete />
            </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MyIllustratedBooks;