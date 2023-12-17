import './App.css';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MyPage from './components/MyPage';
import SignUp from './components/SignUp';
import IllustratedBooks from './components/IllustratedBooks';
import { CreateIllustratedBook } from './components/CreateIllustratedBook';
import FieldManagement from './components/dashboard/FieldManagement';
import TemplateManagement from './components/dashboard/TemplateManagement';
import AdminController from './components/dashboard/AdminController';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/illustratedbooks" element={<IllustratedBooks />} />
          <Route path="/new" element={<CreateIllustratedBook />} />
          <Route path="/dashboard/fields" element={<FieldManagement />} />
          <Route path="/dashboard/templates" element={<TemplateManagement />} />
          <Route path="/dashboard" element={<AdminController />} />
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
