import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import MyIllustratedBooks from './MyIllustratedBooks';
import Likes from './Likes';
import client from '../lib/api/client';
import { SearchComponent } from './SearchComponent';
import { Alert, Snackbar } from '@mui/material';

function MyPage() {
  const [activeTab, setActiveTab] = useState('illustrated_books');
  const [illustratedBooks, setIllustratedBooks] = useState([]);
  const [likes, setLikes] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');

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
      client.get('/user/illustrated_books')
        .then((response) => {
          setIllustratedBooks(response.data.data);
        })
        .catch((error) => {
          console.log('API_request_error', error);
        });
    }

    client.get('/user/likes')
      .then((response) => {
        setLikes(response.data.data);
      })
      .catch((error) => {
        console.log('API_request_error', error);
      });
  }, [illustratedBooks]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className='content'>
        <div className='tabs'>
          <button
            onClick={() => handleTabChange('illustrated_books')}
            className={activeTab === 'illustrated_books' ? 'active' : ''}
          >
            Illustrated Books
          </button>
          <button
            onClick={() => handleTabChange('likes')}
            className={activeTab === 'likes' ? 'active' : ''}
          >
            Likes
          </button>
        </div>
          {activeTab === 'illustrated_books' && (
            <>
              <div className='search'>
                <SearchComponent setSearchTerm={handleSearchResults}/>
                <Snackbar open={!!flashMessage} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}autoHideDuration={6000}>
                  <Alert severity="info" sx={{ width: '100%' }}>
                    {flashMessage}
                  </Alert>
                </Snackbar>
              </div>
              <MyIllustratedBooks illustratedBooks={illustratedBooks} />
            </>
          )}
          {activeTab === 'likes' && <Likes likes={likes} />}
      </div>
    </div>
  );
}

export default MyPage;