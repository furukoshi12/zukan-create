import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import client from '../lib/api/client';
import ReactTagInput from '@pathofdev/react-tag-input';

export const CreateIllustratedBook = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const history = useNavigate();

  const onClickHome = () => {
    history("/mypage");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(e)
    const deleteDoubleArray = [...new Set(tags)];
    const tagStr = deleteDoubleArray.join(' ');
    
    const generateParams = {
      title: title,
      tags: tagStr,
    };

    e.preventDefault();
    try {
      const response = await client.post('/user/illustrated_books', generateParams);
      console.log('tag', response)
      setTitle("");
      setTags([]);
      //history("/mypage");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='container'>
      <div className='content'>
        <Sidebar />
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            mb="24px"
            type="text"
            placeholder="title"
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <ReactTagInput
            placeholder="タグを入力してください"
            tags={tags}
            onChange={(e) => setTags(e)}
            allowUnique={true}
          />
          <button type="submit">
            投稿
          </button>
          <button onClick={onClickHome}>
            戻る
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateIllustratedBook