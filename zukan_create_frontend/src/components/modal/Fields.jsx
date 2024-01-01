import React, { useEffect, useState } from 'react'
import client from '../../lib/api/client';

function Fields({ onAddInput }) {
  const [fieldDesigns, setFieldDesigns] = useState([]);

  useEffect(() => {
    client.get('/field_designs')
      .then((response) => {
        setFieldDesigns(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  },[])

  const handleSelectInput = (inputData) => {
    onAddInput(inputData);
  };

  return (
    <div className='container modal'>
      <ul>
        {fieldDesigns.map((fieldDesign, index) => (
          <li key={index} id={index} className='field-card' onClick={() => handleSelectInput(fieldDesign)}>
            <label>{fieldDesign.attributes.label}</label>
            <textarea
              type="text"
              style={{
                backgroundColor: fieldDesign.attributes.backgroundColor,
                color: fieldDesign.attributes.color,
                borderColor: fieldDesign.attributes.borderColor,
                borderStyle: fieldDesign.attributes.borderStyle,
                borderRadius: fieldDesign.attributes.borderRadius,
                fontFamily: fieldDesign.attributes.fontFamily,
                fontSize: fieldDesign.attributes.fontSize
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fields