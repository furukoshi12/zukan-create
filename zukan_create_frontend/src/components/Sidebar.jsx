import React from 'react'
import { SidebarDate } from './SidebarDate'
import SidebarIcon from './SidebarIcon'

function Sidebar() {
  return (
    <div className='Sidebar'>
      <p className='logo'>
        illustrated<br />
        book create
      </p>
      <SidebarIcon />
      <ul className='SidebarList'>
        {SidebarDate.map((value, key) => {
          return(
            <li
              key={key}
              id={window.location.pathname == value.link ? "active" : ""}
              className="row"
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;