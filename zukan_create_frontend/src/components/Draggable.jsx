import { useEffect } from 'react'
import interact from 'interactjs';

const Draggable = (selector, onUpdatePosition) => {
  useEffect(() => {
    const interactInstance = interact(selector)
      .draggable({
        onstart: (event) => {
          event.target.style.willChange = 'transform';
        },
        onmove: event => {
          requestAnimationFrame(() => {
            const target = event.target;
            const x = (parseFloat(target.dataset.x) || 0) + event.dx;
            const y = (parseFloat(target.dataset.y) || 0) + event.dy;
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

    return () => {
      interactInstance.unset(); // Cleanup when component unmounts
    };
  }, [onUpdatePosition, selector]);
};

export default Draggable;