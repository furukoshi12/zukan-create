import React, { useState } from 'react'
import client from '../lib/api/client'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      window.location.reload();
    }
  };

  return (
    <div>
      <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;
