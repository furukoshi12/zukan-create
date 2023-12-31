import React, { useEffect, useState } from 'react'
import useDraggable from './customHooks/useDraggable';
import useResizable from './customHooks/useResizable';

function AddTemplate({ onFieldContent, areaSize, templateData, onUpdatePosition, onUpdateSize }) {
  useDraggable('.field-card', onUpdatePosition);
  useResizable('.field-card-text', onUpdateSize);
  const [inputs, setInputs] = useState([]);

  useEffect (() => {
    if (templateData) {
      const templateFieldDesigns = templateData.templateFieldDesigns
      const fieldDesigns = templateData.fieldDesigns;

      const usedUuids = new Set();

      const inputsWithPositionAndStyle = templateFieldDesigns.map((design) => {
        const fieldDesign = fieldDesigns.find((fd) => {
          return fd.id === design.relationships.fieldDesign.data.id && !usedUuids.has(fd.uuid)
        });

        if (fieldDesign) {
          usedUuids.add(fieldDesign.uuid);
        }
        
        return {
          ...fieldDesign.attributes,
          templateId: design.relationships.template.data.id,
          xPosition: design.attributes.xPosition,
          yPosition: design.attributes.yPosition,
          width: design.attributes.width,
          height: design.attributes.height,
          id: design.id,
          uuid: fieldDesign.uuid
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
              <li key={input.id} data-id={input.uuid} className='field-card' style={{ position: 'absolute', top: input.yPosition * areaSize.height, left: input.xPosition * areaSize.width }} >
                <label>{input.label}</label>
                <textarea
                  type="text"
                  className='field-card-text'
                  value={input.value}
                  onChange={(e) => onFieldContent(input.uuid, e.target.value)}  
                  style={{
                    backgroundColor: input.backgroundColor,
                    color: input.color,
                    borderColor: input.borderColor,
                    borderStyle: input.borderStyle,
                    borderRadius: input.borderRadius,
                    fontFamily: input.fontFamily,
                    fontSize: input.fontSize,
                    width: input.width * areaSize.width,
                    height: input.height * areaSize.height,
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