import { Box } from '@mui/material';
import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { GuestLogin } from './GuestLogin';


function TopPage(){
  const location = useLocation();
  const isTopPage = location.pathname === '/';

  return (
    <div className={`App ${isTopPage ? 'top-page' : ''}` }>
      <p className='top-logo'>
        illustrated<br />
        book create
      </p>
      <nav className='top-nav'>
        <ul>
          <li>
            <Link className='top-link' to="/signup">SignUp</Link>
          </li>
          <li>
            <Link className='top-link' to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <div className='box-container'>
        <Box className='left-box'>
          <p>当サービスは出会った生き物を記録して、オリジナルの図鑑が作成できるサービスです。</p>
          <GuestLogin />
        </Box>
        <Box className='left-box'>
          <p>作成した図鑑は他のユーザーと共有することができます。</p>
          <button className='button'>
            <Link className='top-link' to="/illustratedbooks">図鑑を見る</Link>
          </button>
        </Box>
      </div>

      <nav className='bottom-nav'>
        <ul>
          <li>
            <Link to="/terms">利用規約</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopPage;