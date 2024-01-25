import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { GuestLogin } from './GuestLogin';
import { HowToUse } from './modal/HowToUse';


function TopPage(){

  return (
    <div className='top-wrapper'>
    <div className='top-page'>
      <div className='header'>
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
      </div>

      <div className='box-container'>
        <Box className='left-box'>
          <p>
            当サービスは出会った生き物を記録して <br/>
            自分だけの図鑑が作成できるサービスです。
            </p>
          <GuestLogin />
        </Box>
        <Box className='left-box'>
          <p>
            作成した図鑑は他のユーザーと <br />
            共有することができます。
          </p>
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
    <h1>図鑑の作り方</h1>
    <HowToUse />
  </div>
  );
}

export default TopPage;