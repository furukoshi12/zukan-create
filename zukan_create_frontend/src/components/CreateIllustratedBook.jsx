import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import client from '../lib/api/client';
import { WithContext as ReactTags } from 'react-tag-input';
import AddField from './AddField';
import AddTemplate from './AddTemplate';
import { v4 as uuidv4 } from 'uuid';

export const CreateIllustratedBook = () => {
  const [title, setTitle] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [template, setTemplate] = useState(null)
  const deleteDoubleArray = [...new Set(tags.map(tag => tag.text))];
  const tagStr = deleteDoubleArray.join(' ');
  const history = useNavigate();
  const templateRef = useRef(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (templateRef.current) {
        setAreaSize({
          width: templateRef.current.offsetWidth,
          height: templateRef.current.offsetHeight,
        });
      }
    };
  
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleAddInput = (inputData) => {
    const uuid = uuidv4();
    setInputs((prevInputs) => [
      ...prevInputs,
      { ...inputData, x: 0, y: 0, width: null, height: null, uuid: uuid },
    ]);
  };

  const handleAddTemplate = (templateData) => {
    setTemplate(templateData);
  };

  const updateInputPosition = (uuid, x, y) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, x, y};
        }
        return input;
      });
    });
  };

  const updateInputSize = (uuid, width, height) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, width, height };
        }
        return input;
      });
    });
  };

  const onFieldContent = (uuid, value) => {
    if (inputs) {
      setInputs((prevInputs) => {
        return prevInputs.map((input) => {
          if (input.uuid === uuid) {
            return { ...input, content: value };
          }
          return input;
        });
      });
    }

    if (template) {
      setTemplate((prevTemplate) => {
        const updateContent = prevTemplate.fieldDesigns.map((fieldDesign) => {
          if (fieldDesign.uuid === uuid) {
            return { ...fieldDesign, content: value };
          }
          return fieldDesign;
        });
        return {
          ...prevTemplate,
          fieldDesigns: updateContent
        }
      })
    }
  };

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
      const templateAttributes = template.fieldDesigns.map(fieldDesign => {
          const templateContent = fieldDesign.content
          const templateId = fieldDesign.id
          return {
            field_design_id: templateId,
            content: templateContent,
          };
      });

      const inputAttributes = inputs.map(input => {
          const inputContent = input.content
          const inputId = input.id
          return {
            field_design_id: inputId,
            content: inputContent
          };  
      });

      const contentAttributes = [...templateAttributes, ...inputAttributes];

      const generateParams = {
        tags: tagStr,
        illustrated_book: {
          title: title,
          template_id: template.id,
          illustrated_book_field_designs_attributes: contentAttributes,
        }
      }

      await client.post('/user/illustrated_books', generateParams);
      setTitle("");
      setTags([]);
      setInputs([]);
      history("/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <Sidebar onAddInput={handleAddInput} onAddTemplate={handleAddTemplate} />
      <div className='content'>
        <form>
          <input
            type="text"
            placeholder="Japanes Name"
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <div className="draggable-area" ref={templateRef}>
            <AddTemplate areaSize={areaSize} templateData={template} onFieldContent={onFieldContent} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize} />
            <AddField data={inputs} onFieldContent={onFieldContent} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
          </div>
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
