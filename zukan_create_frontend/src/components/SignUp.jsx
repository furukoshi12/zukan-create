import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import client from '../lib/api/client';
import { useNavigate } from 'react-router-dom';

function SignUp(){
  const history = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const userData = {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    };

    client.post('/signup', userData)
    .then((response) => {
      console.log('SignUp Success', response.data);
      history('/login');
    })
    .catch((error) => {
      console.error('SignUp Faild', error.response);
      setError('サインアップに失敗しました。');
    });
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className='content'>
        <h1>SignUp</h1>
        <div className='login-form'>
        {error && <div>{error}</div>}
          <p>Name</p>
          <input type='text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <p>Email</p>
          <input type='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Password</p>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>PasswordConfirmation</p>
          <input type='password' placeholder='PasswordConfirmation' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
          <button className="button" onClick={handleSignUp}>SignUp</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;