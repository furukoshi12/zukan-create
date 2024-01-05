import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MyPage from './components/MyPage';
import SignUp from './components/SignUp';
import IllustratedBooks from './components/IllustratedBooks';
import { CreateIllustratedBook } from './components/CreateIllustratedBook';
import { UserManagement } from './components/dashboard//UserManagement';
import { PostManagement } from './components/dashboard//PostManagement';
import { TemplateManagement } from './components/dashboard//TemplateManagement';
import { FieldManagement } from './components/dashboard/FieldManagement';
import { ShowIllustratedBook } from './components/ShowIllustratedBook';
import TopPage from './components/TopPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/illustratedbooks" element={<IllustratedBooks />} />
          <Route path="/illustrated_books/:id" element={<ShowIllustratedBook />} />
          <Route path="/new" element={<CreateIllustratedBook />} />
          <Route path="/dashboard/users" element={<UserManagement />} />
          <Route path="/dashboard/posts" element={<PostManagement />} />
          <Route path="dashboard/templates" element={<TemplateManagement />} />
          <Route path="dashboard/fields" element={<FieldManagement />} />
          {/*<Route path="dashboard/icons" element={<IconManagement />} />*/}
      </Routes>
    </Router>
  );
}

export default App;