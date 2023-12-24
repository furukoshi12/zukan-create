import React, { useState } from 'react';
import SidebarIcon from '../../sidebar/SidebarIcon';
import Modal from '../../modal/Modal';

const AdminSidebar = ({ onSelectComponent, onAddInput, onAddTemplate }) => {
  const [selectedComponent, setSelectedComponent] = useState('UserManagement');
  const isModalVisible = selectedComponent === 'TemplateManagement';

  const AdminSidebarData = [
    {
      title: "UserManagement",
    },
    {
      title: "PostManagement",
    },
    {
      title: "TemplateManagement",
    },
    {
      title: "FieldManagement",
    },
    {
      title: "IconManagement",
    },
  ];

  return (
    <div style={{flex: 0.5}} >
      <div className='Sidebar'>
        <SidebarIcon />
        <ul className='SidebarList'>
          {AdminSidebarData.map((value, key) => (
              <li
                key={key}
                id={ selectedComponent === value.title ? "active" : ""}
                className="row"
                onClick={() => {
                  onSelectComponent(value.title);
                  setSelectedComponent(value.title);
                }}
              >
                <div id="title">{value.title}</div>
              </li>
            ))}
              {isModalVisible && <Modal onAddInput={onAddInput} onAddTemplate={onAddTemplate} />}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
