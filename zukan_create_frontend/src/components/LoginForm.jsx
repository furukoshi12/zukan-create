import React, { useState } from 'react'
import client from '../lib/api/client'
import Sidebar from './Sidebar';
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
      localStorage.setItem('access-token', accessToken);
      console.log('Access token saved:', accessToken);

      history('/mypage')
    }
  };

  return (
    <div className='container'>
      <div className='content'>
      <Sidebar />
        <div className='login-form'>
          <h1>Login</h1>
          <p>Email</p>
          <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Password</p>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
