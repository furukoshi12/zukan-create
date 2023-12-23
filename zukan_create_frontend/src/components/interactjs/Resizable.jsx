import { useEffect } from 'react'
import interact from 'interactjs';

const Resizable = (selector, onUpdateSize) => {
  useEffect(() => {
    let newSize = { width: 0, height: 0 };

    const resizableInstance = interact(selector)
    .resizable({
      edges: { top: false, left: false, bottom: true, right: true },
      onmove: (event) => {
        const target = event.target;
        const newWidth = parseFloat(event.rect.width);
        const newHeight = parseFloat(event.rect.height);

        requestAnimationFrame(() => {
          target.style.width = `${newWidth}px`;
          target.style.height = `${newHeight}px`;
        });

        newSize = { width: newWidth, height: newHeight };
      },
      onend: (event) => {
        event.target.style.willChange = 'auto';
        const target = event.target;
        const parent = target.parentNode;
        const uuid = parent.getAttribute('data-id');
        onUpdateSize(uuid, newSize.width, newSize.height);
      }
    });
    
  return () => {
    resizableInstance.unset();
  };
}, [onUpdateSize, selector]);
};

export default Resizable