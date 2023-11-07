import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import client from '../lib/api/client';
import { WithContext as ReactTags } from 'react-tag-input';

export const CreateIllustratedBook = () => {
  const [title, setTitle] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const deleteDoubleArray = [...new Set(tags.map(tag => tag.text))];
  const tagStr = deleteDoubleArray.join(' ');
  const history = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await client.get('/tags');
        const formattedData = response.data.data.map(tag => ({
          id: tag.id,
          text: tag.attributes.name
        }));
        setSuggestions(formattedData);
      } catch (error) {
        console.error('Error fetching tags: ', error);
      }
    };
    fetchTags();
  }, []);

  const onClickHome = () => {
    history("/mypage");
  };

  const generateParams = {
    title: title,
    tags: tagStr,
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDelete = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post('/user/illustrated_books', generateParams);
      setTitle("");
      setTags([]);
      history("/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='content'>
        <Sidebar />
        <form>
          <input
            mb="24px"
            type="text"
            placeholder="title"
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <ReactTags
            placeholder="Enterでタグ追加"
            tags={tags}
            suggestions={suggestions}
            handleDelete={(i) => handleDelete(i)}
            handleAddition={(tag) => handleAddition(tag)}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            投稿
          </button>
          <button onClick={onClickHome}>
            戻る
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIllustratedBook;
