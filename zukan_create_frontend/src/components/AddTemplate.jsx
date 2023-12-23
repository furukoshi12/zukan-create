import React, { useEffect, useState } from 'react'
import Draggable from './interactjs/Draggable';
import Resizable from './interactjs/Resizable';

function AddTemplate({ templateData, onUpdatePosition, onUpdateSize }) {
  Draggable('.field-card', onUpdatePosition);
  Resizable('.field-card-text', onUpdateSize);
  const [inputs, setInputs] = useState([]);

  useEffect (() => {
    if (templateData) {
      const templateFieldDesigns = templateData.templateFieldDesigns
      const fieldDesigns = templateData.fieldDesigns;

      const inputsWithPositionAndStyle = templateFieldDesigns.map((design) => {
        const fieldDesign = fieldDesigns.find((fd) => fd.id === design.relationships.fieldDesign.data.id);
        return {
          ...fieldDesign.attributes,
          templateId: design.relationships.template.data.id,
          xPosition: design.attributes.xPosition,
          yPosition: design.attributes.yPosition,
          width: design.attributes.width,
          height: design.attributes.height,
          id: design.id
        };
      });

      setInputs(inputsWithPositionAndStyle);
    }
  }, [templateData])

  return (
    <>
      {templateData && (
        <ul>
          {inputs.map(input =>(
              <li key={input.id} className='field-card' style={{ position: 'absolute', top: input.yPosition, left: input.xPosition}} >
                <label>{input.label}</label>
                <textarea
                  type="text"
                  className='field-card-text'
                  style={{
                    backgroundColor: input.backgroundColor,
                    color: input.color,
                    borderColor: input.borderColor,
                    borderStyle: input.borderStyle,
                    borderRadius: input.borderRadius,
                    fontFamily: input.fontFamily,
                    fontSize: input.fontSize,
                    width: input.width,
                    height: input.height,
                  }}
                />
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default AddTemplate;