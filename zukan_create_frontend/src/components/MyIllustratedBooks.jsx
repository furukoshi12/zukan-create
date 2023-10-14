import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';

function MyIllustratedBooks() {
  const [myIllustratedBooks, setMyIllustratedBooks] = useState([]);

  useEffect(() => {
    client.get('/user/illustrated_books')
      .then(response => {
        setMyIllustratedBooks(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error.response)
      })
  }, []);

  return (
    <div className='card-container'>
      <ul>
      {myIllustratedBooks.map(illustratedBook => (
        <li key={illustratedBook .id} className='illustrated-book-card'>
          <p className='title'>{illustratedBook .attributes.title}</p>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default MyIllustratedBooks;