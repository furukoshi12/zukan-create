import React from 'react';
import SidebarIcon from '../sidebar/SidebarIcon';
import Modal from '../modal/Modal';

const AdminSidebar = ({ onAddInput, onAddTmplate }) => {
  const isModalVisible = window.location.pathname === '/dashboard/templates';

  const AdminSidebarData = [
    {
      title: "UserManagement",
      link: "/dashboard/users",
    },
    {
      title: "PostManagement",
      link: "/dashboard/illustrated_books",
    },
    {
      title: "TemplateManagement",
      link: "/dashboard/templates",
    },
    {
      title: "FieldManagement",
      link: "/dashboard/fields",
    },
    {
      title: "IconManagement",
      link: "/dashboard/icons",
    },
  ];

  return (
    <div className='Sidebar'>
      <SidebarIcon />
      <ul className='SidebarList'>
        {AdminSidebarData.map((value, key) => (
            <li
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              className="row"
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
              <div id="title">{value.title}</div>
            </li>
          ))}
            {isModalVisible && <Modal onAddInput={onAddInput} onAddTmplate={onAddTmplate} />}
      </ul>
    </div>
  );
};

export default AdminSidebar;
