import React from 'react'
import { useLocation, Link } from 'react-router-dom';


function TopPage(){
  const location = useLocation();
  const isTopPage = location.pathname === '/';

  return (
      <div className={`App ${isTopPage ? 'top-page' : ''}` }>
        <p className='top-logo'>
          illustrated<br />
          book create
        </p>

      <nav>
        <ul>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopPage;