import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MyIllustratedBooks from './MyIllustratedBooks';
import LikeList from './Likes';

function MyPage() {
  const [activeTab, setActiveTab] = useState('myIllustratedBooks');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='container'>
      <div className='content'>
        <Sidebar />
        <div className='tabs'>
          <button
            onClick={() => handleTabChange('myIllustratedBooks')}
            className={activeTab === 'myIllustratedBooks' ? 'active' : ''}
          >
            Post
          </button>
          <button
              onClick={() => handleTabChange('like')}
              className={activeTab === 'likes' ? 'active' : ''}
            >
              Like
          </button>
        </div>
        <div className='tab-content'>
          {activeTab === 'myIllustratedBooks' && <MyIllustratedBooks />}
          {activeTab === 'likes' && <LikeList />}
        </div>
      </div>
    </div>
  );
}

export default MyPage;