import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import MyIllustratedBooks from './MyIllustratedBooks';
import Likes from './Likes';
import client from '../lib/api/client';

function MyPage() {
  const [activeTab, setActiveTab] = useState('illustrated_books');
  const [illustratedBooks, setIllustratedBooks] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    client.get('/user/illustrated_books')
      .then((response) => {
        setIllustratedBooks(response.data.data);
      })
      .catch((error) => {
        console.log('API_request_error', error);
      });

    client.get('/user/likes')
      .then((response) => {
        setLikes(response.data.data);
      })
      .catch((error) => {
        console.log('API_request_error', error);
      });
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='container'>
      <div className='content'>
        <Sidebar />
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
        <div className='tab-content'>
          {activeTab === 'illustrated_books' && <MyIllustratedBooks illustratedBooks={illustratedBooks} />}
          {activeTab === 'likes' && <Likes likes={likes} />}
        </div>
      </div>
    </div>
  );
}

export default MyPage;