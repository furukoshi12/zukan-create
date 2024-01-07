import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import client from '../lib/api/client'
import LikeButton from './LikeButton';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Snackbar } from '@mui/material';
import defaultImagePath from '../images/default.webp'
import { SearchComponent } from './SearchComponent';


function IllustratedBooks(){
  const [illustratedBooks, setIllustratedBooks] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const history = useNavigate();

  const handleSearchResults = async (searchTerm) => {
    try {
      const response = await client.get('/illustrated_books', { params: {search: searchTerm }});
      const data = response.data.data;

      if (data.length === 0) {
        setFlashMessage('お探しの図鑑は見つかりませんでした。')
      } else {
        setFlashMessage('');
      }

      setIllustratedBooks(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleClose = () => {
    setFlashMessage('');
  };

  useEffect(() => {
    if (illustratedBooks.length === 0) {
      client.get('/illustrated_books')
      .then((response) => {
        setIllustratedBooks(response.data.data)
      })
      .catch((error) => {
        console.log('API_reuest_error', error);
      });
    }
  }, [illustratedBooks]);

  const handleSelectIllustratedBook = (illustratedBook) => {
    history(`/illustrated_books/${illustratedBook.id}`);
  };


  return (
    <div className='container'>
    <Sidebar />
      <div className='content'>
        <h1>みんなの図鑑</h1>
          <div className='search'>
            <SearchComponent setSearchTerm={handleSearchResults}/>
            <Snackbar open={!!flashMessage} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}autoHideDuration={6000}>
              <Alert severity="info" sx={{ width: '100%' }}>
                {flashMessage}
              </Alert>
            </Snackbar>
          </div>
        <ul className='grid'>
          {illustratedBooks.map(illustratedBook => (
            <li key={illustratedBook.id} className='illustrated-book-card'>
              <Box>
                <img src={illustratedBook.attributes.image.url || defaultImagePath} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                <p className='title' onClick={() => handleSelectIllustratedBook(illustratedBook)}>{illustratedBook.attributes.title}</p>
              </Box>
              <div className="tags">
                {illustratedBook.attributes.tags.map((tag, index) => (
                  <p key={index} className='tag'>#{tag}</p>
                ))}
              </div>
              <LikeButton illustratedBookId={illustratedBook.id}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IllustratedBooks;