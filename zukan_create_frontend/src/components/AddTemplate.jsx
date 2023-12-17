import React, { useEffect, useState } from 'react'
import Draggable from './Draggable';

function AddTemplate({ templateData, onUpdatePosition }) {
  Draggable('.field-card', onUpdatePosition);
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
        };
      });

      setInputs(inputsWithPositionAndStyle);
    }
  }, [templateData])



  return (
    <div>
      {templateData && (
          <div key={templateData.id} className='template-card'>
            <ul>
              {inputs.map(input =>(
                  <li key={input.uuid} className='field-card' style={{ position: 'absolute', left: input.xPosition, top: input.yPosition }} >
                    <label>{input.label}</label>
                    <textarea
                      type="text"
                      style={{
                        backgroundColor: input.backgroundColor,
                        color: input.color,
                        borderColor: input.borderColor,
                        borderStyle: input.borderStyle,
                        borderRadius: input.borderRadius,
                        fontFamily: input.fontFamily,
                        fontSize: input.fontSize,
                      }}
                    />
                  </li>
                ))}
            </ul>
          </div>
      )}
    </div>
  );
}

export default AddTemplate;
