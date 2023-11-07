import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import client from '../lib/api/client'
import LikeButton from './LikeButton';

function IllustratedBooks(){
  const [illustratedBooks, setIllustratedBooks] = useState([]);

  useEffect(() => {
    client.get('/illustrated_books')
    .then((response) => {
      console.log(response)
      setIllustratedBooks(response.data.data)
    })
    .catch((error) => {
      console.log('API_reuest_error', error);
    });
  }, []);

  return (
    <div className='container'>
      <div className='content'>
      <Sidebar />
        <div className='card-container'>
          <ul>
            {illustratedBooks.map(illustratedBook => (
              <li key={illustratedBook.id} className='illustrated-book-card'>
                <p className='title'>{illustratedBook.attributes.title}</p>
                <p className='tag'>{illustratedBook.attributes.tags}</p>
                <LikeButton illustratedBookId={illustratedBook.id}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IllustratedBooks;