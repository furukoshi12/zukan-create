import React, { useState } from 'react';
import AddField from '../AddField';
import client from '../../lib/api/client';
import AdminSidebar from './sidebar/AdminSidebar'
import { v4 as uuidv4 } from 'uuid';
import AddTemplate from '../AddTemplate';

const TemplateManagement = () => {
  const [name, setName] = useState('');
  const [templateInputs, setTemplateInputs] = useState([]);
  const [template, setTemplate] = useState(null)

  const handleAddTemplate = (templateData) => {
    setTemplate(templateData);
  };

  const addInputToTemplate = (inputData) => {
    const uuid = inputData.uuid || uuidv4();
    setTemplateInputs((prevInputs) => [
      ...prevInputs,
      { ...inputData, x: 0, y: 0, width: null, height: null, uuid: uuid},
    ]);
  };

  const updateInputPosition = ( uuid, x, y) => {
    setTemplateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, x, y};
        }
        return input;
      });
    });
  };

  const updateInputSize = ( uuid, width, height) => {
    setTemplateInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if(input.uuid === uuid) {
          return { ...input, width, height};
        }
        return input;
      });
    });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const templateParams = {
    template: {
      name: name,
      template_field_designs_attributes: templateInputs.map(input => ({
        field_design_id: input.id,
        x_position: input.x,
        y_position: input.y,
        width: input.width,
        height: input.height,
      }))
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const reaponse = await client.post('/templates', templateParams);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <AdminSidebar onAddInput={addInputToTemplate} onAddTemplate={handleAddTemplate}/>
      <div className='content'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type='text' placeholder="Template Name" onChange={(e) => handleName(e)} value={name} />
          <div className="draggable-area" style={{backgroundColor: 'white', width: '210mm', height: '297mm', position: 'relative'}}>
            <AddTemplate templateData={template} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
            <AddField data={templateInputs} onUpdatePosition={updateInputPosition} onUpdateSize={updateInputSize}/>
          </div>
          <button type='submit'>Create Template</button>
        </form>
      </div>
    </div>
  );
};

export default TemplateManagement;