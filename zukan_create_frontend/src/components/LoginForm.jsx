import React, { useState } from 'react'
import client from '../lib/api/client'
import Sidebar from './sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await client.post('/login', {
        email,
        password,
      });

      handleLoginResponse(response);
    } catch (error) {
      console.error('Login faild', error);
      setError('ログインに失敗しました');
    }
  };

  const handleLoginResponse = (response) => {
    const accessToken =  response.data['accessToken'];
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);

      history('/mypage')
    }
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className='content'>
        <h1>Login</h1>
        <div className='flash-message'>{error && <div>{error}</div>}</div>
        <div className='login-form'>
          <form>
            <p>メールアドレス</p>
            <input type='email' autoComplete='username' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>パスワード</p>
            <input type='password' autoComplete="current-password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='button' className="button" onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
