import React from 'react'
import Home from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import { Grading } from '@mui/icons-material';

export const SidebarData = [
  {
    title: "MyPage",
    icon: <Home />,
    link: "/mypage",
  },
  {
    title: "Regulation",
    icon: <Grading />,
    link: "/regulation",
  },
  {
    title: "Mail",
    icon: <MailIcon />,
    link: "/mail",
  },
];
