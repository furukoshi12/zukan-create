import React from 'react'
import AdminSidebar from './AdminSidebar'
import Templates from '../modal/Templates'

const AdminController = () => {
  return (
    <div className='container'>
      <AdminSidebar />
      <div className="draggable-area" style={{clear: 'left', backgroundColor: 'white', width: '210mm', height: '297mm', position: 'relative'}}>
      <Templates />
      </div>
    </div>
  )
}

export default AdminController