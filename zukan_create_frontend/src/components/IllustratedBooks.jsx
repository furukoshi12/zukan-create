import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import client from '../lib/api/client'
import LikeButton from './LikeButton';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import defaultImagePath from '../images/default.webp'


function IllustratedBooks(){
  const [illustratedBooks, setIllustratedBooks] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    client.get('/illustrated_books')
    .then((response) => {
      setIllustratedBooks(response.data.data)
    })
    .catch((error) => {
      console.log('API_reuest_error', error);
    });
  }, []);

  const handleSelectIllustratedBook = (illustratedBook) => {
    history(`/illustrated_books/${illustratedBook.id}`);
  };

  return (
    <div className='container'>
    <Sidebar />
      <div className='content'>
        <ul className='grid'>
          {illustratedBooks.map(illustratedBook => (
            <li key={illustratedBook.id} className='illustrated-book-card'>
              <Box>
                <img src={illustratedBook.attributes.image.url || defaultImagePath} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <p className='title' onClick={() => handleSelectIllustratedBook(illustratedBook)}>{illustratedBook.attributes.title}</p>
              </Box>
              <p className='tag'>{illustratedBook.attributes.tags}</p>
              <LikeButton illustratedBookId={illustratedBook.id}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IllustratedBooks;