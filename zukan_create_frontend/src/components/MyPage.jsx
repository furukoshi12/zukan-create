import React, { useState } from 'react'
import Sidebar from './Sidebar'

function MyPage() {
  const [activeTab, setActiveTab] = useState('post');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <Sidebar />
      <div className='tabs'>
        <button
          onClick={() => handleTabChange('post')}
          className={activeTab === 'post' ? 'active' : ''}
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
        {activeTab === 'post' && <PostList />}
        {activeTab === 'like' && <LikeList />}
      </div>
    </div>
  );
}

export default MyPage