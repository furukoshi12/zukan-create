import React, { useState } from 'react';
import AdminSidebar from './sidebar/AdminSidebar'
import { UserManagement } from './UserManagement';
import { PostManagement } from './PostManagement';

const AdminController = () => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'UserManagement':
        return <UserManagement />;
      case 'PostManagement':
        return <PostManagement />;
        default:
          return <UserManagement />;
    }
  };

  return (
    <div className='container'>
      <AdminSidebar onSelectComponent={(component) => setSelectedComponent(component)} />
      <div className='content'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminController