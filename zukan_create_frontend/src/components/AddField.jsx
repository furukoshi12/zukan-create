import React from 'react'
import Draggable from './interactjs/Draggable';
import Resizable from './interactjs/Resizable';

const AddField = ({ data, onUpdatePosition, onUpdateSize, onFieldContent  }) => {
  Draggable('.field-card', onUpdatePosition);
  Resizable('.field-card-text', onUpdateSize);

  return (
    <>
      {data && data.length > 0 && (
        <ul>
          {data.map((fieldDesign, index) => (
            <li key={index} data-id={fieldDesign.uuid} className='field-card' style={{position: 'absolute', top: `${fieldDesign.y}px`, left:`${fieldDesign.x}px` }}>
              <label>{fieldDesign.attributes.label}</label>
              <textarea
                type="text"
                className='field-card-text'
                value={fieldDesign.value}
                onChange={(e) => onFieldContent(fieldDesign.uuid, e.target.value)}
                style={{
                  backgroundColor: fieldDesign.attributes.backgroundColor,
                  color: fieldDesign.attributes.color,
                  borderColor: fieldDesign.attributes.borderColor,
                  borderStyle: fieldDesign.attributes.borderStyle,
                  borderRadius: fieldDesign.attributes.borderRadius,
                  fontFamily: fieldDesign.attributes.fontFamily,
                  fontSize: fieldDesign.attributes.fontSize,
                  width: fieldDesign.width,
                  height: fieldDesign.height,
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AddField;
