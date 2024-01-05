import React, { useEffect, useState, useRef } from 'react'
import Sidebar from './sidebar/Sidebar'
import { useParams } from 'react-router-dom'
import client from '../lib/api/client';

export const ShowIllustratedBook = () => {
  let { id } = useParams();
  const [illustratedBook, setIllustratedBook] = useState(null);
  const [usedFileds, setUsedFields] = useState([]);
  const templateRef = useRef(null);
  const [areaSize, setAreaSize] = useState({ width: null, height: null });

  useEffect(() => {
    const updateSize = () => {
      if (templateRef.current) {
        setAreaSize({
          width: templateRef.current.offsetWidth,
          height: templateRef.current.offsetHeight,
        });
      } else {
        setTimeout(updateSize, 10);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    client.get(`/illustrated_books/${id}`)
    .then((response) => {
      setIllustratedBook(response.data.data.attributes)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [id]);

  useEffect(() => {
    if (illustratedBook && illustratedBook.illustratedBookFieldDesigns) {
      Promise.all(illustratedBook.illustratedBookFieldDesigns.map(obj =>
        client.get(`/field_designs/${obj.fieldDesignId}`).then(response => response.data.data)
      ))
      .then((responses) => {
        setUsedFields(responses)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [illustratedBook]);

  if (!illustratedBook || !illustratedBook.illustratedBookFieldDesigns) {
    return <div>Loading...</div>;
  }
  
  const showPost = illustratedBook.illustratedBookFieldDesigns.map((design) => {
    const fieldDesign = usedFileds.find((field) => field.id === design.fieldDesignId.toString());
    if (fieldDesign) {
      return {
        illustratedBook: {
        ...design,
        },
        fieldDesign: {
          attributes: { ...fieldDesign.attributes }
        }
      };
    } else {
      return null;
    }
  }).filter(item => item !== null);

  return (
    <div className='container'>
      <Sidebar />
      <div className='content'>
        <div className="draggable-area" ref={templateRef}>
          {showPost && (
            <ul>
              {showPost.map((object, index) => (
                <li key={index} style={{ position: 'absolute', top: object.illustratedBook.yPosition * areaSize.height, left: object.illustratedBook.xPosition * areaSize.width }} >
                  <label>{object.fieldDesign.attributes.label}</label>
                  <textarea
                    type="text"
                    className='field-card-text'
                    defaultValue={object.illustratedBook.content}
                    style={{
                      backgroundColor: object.fieldDesign.attributes.backgroundColor,
                      color: object.fieldDesign.attributes.color,
                      borderColor: object.fieldDesign.attributes.borderColor,
                      borderStyle: object.fieldDesign.attributes.borderStyle,
                      borderRadius: object.fieldDesign.attributes.borderRadius,
                      fontFamily: object.fieldDesign.attributes.fontFamily,
                      fontSize: object.fieldDesign.attributes.fontSize,
                      width: object.illustratedBook.width * areaSize.width,
                      height: object.illustratedBook.height * areaSize.height,
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}