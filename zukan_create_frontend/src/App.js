import './App.css';
//import { Link, Route, Router, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import TopPage from './components/TopPage';

function App() {
  return (
      <div className="App">
        <TopPage />
        <LoginForm />
        <Sidebar />
      </div>
  );
}

export default App;
