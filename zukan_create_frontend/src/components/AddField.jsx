import React from 'react'

const AddField = ({ data }) => {
  console.log('Add', data)
  
  return (
    <div>
      <div>
        {data && (
          <ul>
            {data.map(fieldDesign => (
              <li key={fieldDesign.id} className='field-card'>
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
        )}
      </div>
    </div>
  );
};

export default AddField;