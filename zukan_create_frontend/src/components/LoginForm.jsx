import React, { useState } from 'react'
import client from '../lib/api/client'
import Sidebar from './sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }
  };

  const handleLoginResponse = (response) => {
    const accessToken =  response.data['accessToken'];
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      console.log('Access token saved:', accessToken);

      history('/mypage')
    } else {
      console.error('Invalid response data: no accessToken found');
    }
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className='content'>
        <h1>Login</h1>
        <div className='login-form'>
          <form>
            <p>Email</p>
            <input type='email' autoComplete='username' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>Password</p>
            <input type='password' autoComplete="current-password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </form>
          <button className="button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
