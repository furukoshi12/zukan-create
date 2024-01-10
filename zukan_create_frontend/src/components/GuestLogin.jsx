import React from 'react'
import client from '../lib/api/client'
import { useNavigate } from 'react-router-dom'

export const GuestLogin = () => {
  const history = useNavigate();

  const handleGuestLogin = async() => {
    try {
      const response = await client.post('/guest_login')
      handleLoginResponse(response);
    } catch (error) {
      console.error('Login faild', error);
    }
  }

  const handleLoginResponse = (response) => {
    const accessToken =  response.data['accessToken'];
    const role = response.data.data.attributes.role
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_role', role)

      history('/new')
    };
  }

  return (
    <>
      <button type='button' className='button' onClick={handleGuestLogin}>
        ゲストで図鑑作成
      </button>
    </>
  )
}
