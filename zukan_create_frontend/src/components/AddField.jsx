import interact from 'interactjs';
import React, { useEffect } from 'react'

const AddField = ({ data, onUpdatePosition }) => {
  useEffect(() => {
    interact('.field-card')
      .draggable({
      onstart: (event) => {
        event.target.style.willChange = 'transform';
      },
      onmove: event => {
        requestAnimationFrame(() => {
        const target = event.target;
        const x = (parseFloat(target.dataset.x) || 0 ) + event.dx;
        const y = (parseFloat(target.dataset.y) || 0 ) + event.dy;
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.dataset.x = x;
        target.dataset.y = y;
        });
      },
      onend: (event) => {
        event.target.style.willChange = 'auto';
      },
    })
    .on('dragend', (event) => {
      const target = event.target;
      const uuid = target.getAttribute('data-id');
      const x = parseFloat(target.getAttribute('data-x')) || 0;
      const y = parseFloat(target.getAttribute('data-y')) || 0;
      let finalX = x;
      let finalY = y;

      const draggableArea = document.querySelector('.draggable-area');

      if (x < 0 || y < 0 || x + target.offsetWidth > draggableArea.offsetWidth || y + target.offsetHeight > draggableArea.offsetHeight) {
        target.style.transform = 'translate(0px, 0px)';
        finalX = 0;
        finalY = 0;
        target.setAttribute('data-x', finalX);
        target.setAttribute('data-y', finalY);
      }
      onUpdatePosition(uuid, finalX, finalY);
    });
  }, [data, onUpdatePosition]);
  
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