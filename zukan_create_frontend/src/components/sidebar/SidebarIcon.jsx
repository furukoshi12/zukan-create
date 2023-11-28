import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';
import Icon from '../../images/top.webp'

function SidebarIcon() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
      client.get('/current_user')
        .then(response => {
          setUserName(response.data.name);
        })
        .catch(error => {
          console.error('Error fetching user data:', error.response)
        })
      }
  }, [localStorage.getItem('accessToken')]);

  return (
    <div className='SidebarIcon'>
      <img src={Icon} />
      <p>{userName}</p>
    </div>
  );
}

export default SidebarIcon;