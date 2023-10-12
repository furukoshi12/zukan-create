import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MyPostList from './MyPostList';
import LikeList from './LikeList';

function MyPage() {
  const [activeTab, setActiveTab] = useState('myPosts');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='container'>
      <div className='content'>
        <Sidebar />
        <div className='tabs'>
          <button
            onClick={() => handleTabChange('myPosts')}
            className={activeTab === 'myPosts' ? 'active' : ''}
          >
            Post
          </button>
          <button
              onClick={() => handleTabChange('like')}
              className={activeTab === 'like' ? 'active' : ''}
            >
              Like
          </button>
        </div>
        <div className='tab-content'>
          {activeTab === 'myPosts' && <MyPostList />}
          {activeTab === 'like' && <LikeList />}
        </div>
      </div>
    </div>
  );
}

export default MyPage;