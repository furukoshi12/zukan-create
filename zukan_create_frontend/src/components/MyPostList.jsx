import React, { useEffect, useState } from 'react'
import client from '../lib/api/client';

function MyPostList() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    client.get('/user/illustrated_books')
      .then(response => {
        console.log(response)
        setMyPosts(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error.response)
      })
  }, []);

  return (
    <div className='card-container'>
      <ul>
      {myPosts.map(post => (
        <li key={post.id} className='post-card'>
          <p className='title'>{post.attributes.title}</p>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default MyPostList;