import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import client from '../lib/api/client'
import LikeButton from './LikeButton';
import { useNavigate } from 'react-router-dom';

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
      <div className='card-container'>
        <ul>
          {illustratedBooks.map(illustratedBook => (
            <li key={illustratedBook.id} className='illustrated-book-card'>
              <p className='title' onClick={() => handleSelectIllustratedBook(illustratedBook)}>{illustratedBook.attributes.title}</p>
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