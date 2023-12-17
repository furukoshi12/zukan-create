import React from 'react'
import Draggable from './Draggable';

const AddField = ({ data, onUpdatePosition }) => {
  Draggable('.field-card', onUpdatePosition);

  return (
    <div>
      <div>
        {data && (
          <ul>
            {data.map((fieldDesign, index) => (
              <li key={index} data-id={fieldDesign.uuid} className='field-card' style={{position: 'absolute', top: `${fieldDesign.y}px`, left:`${fieldDesign.x}px` }}>
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
                    fontSize: fieldDesign.attributes.fontSize,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddField;