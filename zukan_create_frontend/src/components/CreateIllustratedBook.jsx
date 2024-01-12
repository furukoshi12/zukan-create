import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import client from '../lib/api/client';
import { WithContext as ReactTags } from 'react-tag-input';
import AddField from './AddField';
import AddTemplate from './AddTemplate';
import { v4 as uuidv4 } from 'uuid';
import { useDraggableAreaSize } from './customHooks/useDraggableAreaSize';
import { ImageForm, ImagePreviewer } from './ImageForm';

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
  const [image, setImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const inputRef = useRef(null);

  const onAreaSize = (size) => {
    setAreaSize(size);
  }
  useDraggableAreaSize(templateRef, onAreaSize)

  const handleAddInput = (inputData) => {
    const uuid = uuidv4();
    setInputs((prevInputs) => [
      ...prevInputs,
      { ...inputData, x: 0, y: 0, width: 162, height: 42, uuid: uuid },
    ]);
  };

  const handleAddTemplate = (templateData) => {
    setTemplate(templateData);
  };

  const handleUpdateInputs = (newInputs) => {
    setTemplate(newInputs)
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

  const removeItem = (uuid) => {
    setInputs((prevInputs) => {
      const updateInputs = prevInputs.filter((input) => input.uuid !== uuid);
      return updateInputs;
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


  const updateTemplatePosition = (uuid, x, y) => {
    setTemplate((prevTemplate) => {
      if (prevTemplate && prevTemplate.templateFieldDesigns !== null) {
        const fieldDesignToUpdate = prevTemplate.fieldDesigns.find((fieldDesign) => fieldDesign.uuid === uuid);
        if (fieldDesignToUpdate) {
          const updatedTemplateFieldDesigns = prevTemplate.templateFieldDesigns.map((templateFieldDesign) => {
            if (templateFieldDesign.xPosition === fieldDesignToUpdate.attributes.relationTemplates.map((relationTemplate) => relationTemplate.xPosition) ||
                templateFieldDesign.yPosition === fieldDesignToUpdate.attributes.relationTemplates.map((relationTemplate) => relationTemplate.yPosition)
            ) {
              return {
                ...templateFieldDesign,
                attributes: {
                  ...templateFieldDesign.attributes,
                  xPosition: x / areaSize.width,
                  yPosition: y / areaSize.height,
                }
              };
            }
            return templateFieldDesign;
          });
    
          return {
            ...prevTemplate,
            templateFieldDesigns: updatedTemplateFieldDesigns,
          };
        }
      } else {
        return prevTemplate;
      }
    });
  };        

  const updateTemplateSize = (uuid, width, height) => {
    setTemplate((prevTemplate) => {
      if (prevTemplate && prevTemplate.templateFieldDesigns !== null) {
        const fieldDesignToUpdate = prevTemplate.fieldDesigns.find((fieldDesign) => fieldDesign.uuid === uuid);
        if (fieldDesignToUpdate) {
          const updatedTemplateFieldDesigns = prevTemplate.templateFieldDesigns.map((templateFieldDesign) => {
            if (templateFieldDesign.width === fieldDesignToUpdate.attributes.relationTemplates.map((relationTemplate) => relationTemplate.width) ||
                templateFieldDesign.height === fieldDesignToUpdate.attributes.relationTemplates.map((relationTemplate) => relationTemplate.height)
            ) {
              return {
                ...templateFieldDesign,
                attributes: {
                  ...templateFieldDesign.attributes,
                  width: width / areaSize.width,
                  height: height / areaSize.height,
                }
              };
            }
            return templateFieldDesign;
          });
    
          return {
            ...prevTemplate,
            templateFieldDesigns: updatedTemplateFieldDesigns,
          };
        }
      } else {
        return prevTemplate;
      }
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
        if (prevTemplate.templateFieldDesigns) {
          const additionalContent = prevTemplate.templateFieldDesigns.map(templateFieldDesign => {
            const height = templateFieldDesign.attributes.height
            const width = templateFieldDesign.attributes.width
            const xPosition = templateFieldDesign.attributes.xPosition
            const yPosition = templateFieldDesign.attributes.yPosition
            return{
              height: height,
              width: width,
              x_position: xPosition,
              y_position: yPosition,
            };  
          });
              updateContent.push(...additionalContent);
        }    
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
      const usedTemplateFieldDesignIds = new Set();

        let templateAttributes = template && template.fieldDesigns
          ? template.fieldDesigns.reduce((acc, fieldDesign) => {
            if (fieldDesign.id != null) {
              const index = template.templateFieldDesigns.findIndex(tfd =>
                tfd.relationships.fieldDesign.data.id === fieldDesign.id && !usedTemplateFieldDesignIds.has(tfd.id)
              );
            
              if (index !== -1) {
                const templateFieldDesign = template.templateFieldDesigns[index];
                usedTemplateFieldDesignIds.add(templateFieldDesign.id);  
              
                acc.push({
                  field_design_id: fieldDesign.id,
                  content: fieldDesign.content,
                  height: templateFieldDesign.attributes.height,
                  width: templateFieldDesign.attributes.width,
                  x_position: templateFieldDesign.attributes.xPosition,
                  y_position: templateFieldDesign.attributes.yPosition,
                });
              } else {
                acc.push({
                  field_design_id: fieldDesign.id,
                  content: fieldDesign.content
                });
              }
            }
            return acc;
          }, [])
          : [];

      const inputAttributes = inputs.map(input => {
        const attributes = {
          field_design_id: input.id,
          content: input.content,
          height: input.height / areaSize.height,
          width: input.width / areaSize.width,
          x_position: input.x / areaSize.width,
          y_position: input.y / areaSize.height,
        };
        return attributes;
      });

      const contentAttributes = [...templateAttributes, ...inputAttributes];
      
      const generateParams = {
        tags: tagStr,
        illustrated_book: {
          title: title,
          image: image,
          image_x_position: imagePosition.x / areaSize.width,
          image_y_position: imagePosition.y / areaSize.height,
          template_id: template && template.id ? template.id : 1,
          illustrated_book_field_designs_attributes: contentAttributes,
        }
      }

      await client.post('/user/illustrated_books', generateParams, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setTitle("");
      setTags([]);
      setInputs([]);
      setTemplate(null);
      setImage(null);
      setImagePosition({ x: 0, y: 0 })
      history("/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  const resetPreview = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setImage(null);
  };

  const updateImagePosition = (uuid, x, y) => {
    console.log(x,y)
    if (uuid === null) {
      setImagePosition({ x: x, y: y });
    }
  };


  return (
    <div className='container'>
      <Sidebar onAddInput={handleAddInput} onAddTemplate={handleAddTemplate} />
      <div className='content-create'>
        <form>
          <input
            type="text"
            placeholder="Japanes Name"
            onChange={(e) => handleChange(e)}
            value={title}
          />
          <ImageForm setImage={setImage} inputRef={inputRef} />
          <div className="draggable-area" ref={templateRef} >
            {image && <ImagePreviewer imageFile={image} onReset={resetPreview} imagePosition={imagePosition} inputRef={inputRef} onUpdatePosition={updateImagePosition} />}
            <AddTemplate areaSize={areaSize} onUpdateInputs={handleUpdateInputs} templateData={template} onFieldContent={onFieldContent} onUpdatePosition={updateTemplatePosition} onUpdateSize={updateTemplateSize} />
            <AddField data={inputs} onRemoveItem={removeItem} onFieldContent={onFieldContent} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
          </div>
          <ReactTags
            placeholder="Enterでタグ追加"
            tags={tags}
            suggestions={suggestions}
            handleDelete={(i) => handleDelete(i)}
            handleAddition={(tag) => handleAddition(tag)}
          />
          <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>
            投稿
          </button>
          <button className="button" onClick={onClickHome}>
            戻る
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIllustratedBook;
