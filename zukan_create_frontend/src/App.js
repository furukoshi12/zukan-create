import './App.css';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MyPage from './components/MyPage';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

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

export default App;
