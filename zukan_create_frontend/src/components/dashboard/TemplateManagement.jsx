import React, { useState } from 'react';
import AddField from '../AddField';
import client from '../../lib/api/client';
import AdminSidebar from './AdminSidebar';
import { v4 as uuidv4 } from 'uuid';

const TemplateManagement = () => {
  const [name, setName] = useState('');
  const [templateInputs, setTemplateInputs] = useState([]);

  const addInputToTemplate = (inputData) => {
    const uuid = inputData.uuid || uuidv4();
    setTemplateInputs((prevInputs) => [
      ...prevInputs,
      { ...inputData, x: 0, y: 0, uuid: uuid},
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
      <AdminSidebar onAddInput={addInputToTemplate} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Template Name</label>
        <input type='text' onChange={(e) => handleName(e)} value={name} />
        <div className="draggable-area" style={{backgroundColor: 'white', width: '210mm', height: '297mm', position: 'relative'}}>
          <AddField data={templateInputs} onUpdatePosition={updateInputPosition} />
        </div>
        <button type='submit'>Create Template</button>
      </form>
    </div>
  );
};

export default TemplateManagement;