import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';

function Templates({ onAddTemplate }) {
  const [templates, setTemplates] = useState([]);
  const [templateObj, setTemplateObj] = useState(null);

  useEffect(() => {
    client.get('/templates')
      .then((response) => {
        setTemplateObj(response);
        setTemplates(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleSelectTemplate = (selectTemplate) => {
    const templateData = templateObj.data.data.find(template => template.id === selectTemplate.id);
    if (templateData) {
      const templateFieldDesignObjects = templateObj.data.included.filter(obj => 
        obj.type === 'template_field_design' && obj.relationships.template.data.id === templateData.id
      );
      const fieldDesignObjects = templateFieldDesignObjects.flatMap((tempFieldObj) =>
        templateObj.data.included.filter(obj =>
          obj.type === 'field_design' && obj.id === tempFieldObj.relationships.fieldDesign.data.id
        )
      );
        onAddTemplate({
          id: templateData.id,
          templateFieldDesigns: templateFieldDesignObjects, 
          fieldDesigns: fieldDesignObjects,
        });
    }
  };

  return (
    <div className='container' style={{ backgroundColor: "white" }}>
      <ul>
        {templates.map(template => (
          <li key={template.id} className='template-card' onClick={() => handleSelectTemplate(template)}>
            {template.attributes.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Templates;