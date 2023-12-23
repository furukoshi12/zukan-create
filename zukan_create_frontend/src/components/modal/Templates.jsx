import React, { useEffect, useState } from 'react';
import client from '../../lib/api/client';

function Templates({ onAddTemplate }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    client.get('/templates')
      .then((response) => {
        setTemplates(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleSelectTemplate = (selectTemplate) => {
    const templateId = selectTemplate.id
    client.get(`/templates/${templateId}`)
      .then((response) => {
        const templateFieldDesignObjects = response.data.included.filter(obj => obj.type === 'template_field_design');

        const fieldDesignsCount = response.data.data.relationships.fieldDesigns.data;
        const includedFieldDesigns = response.data.included.filter(obj => obj.type === 'field_design');
        const fieldDesignObjects = fieldDesignsCount.map(relationship => {
          return includedFieldDesigns.find(included => included.id === relationship.id);
        });

        onAddTemplate({
          id: templateId,
          templateFieldDesigns: templateFieldDesignObjects, 
          fieldDesigns: fieldDesignObjects,
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
};

export default Templates;