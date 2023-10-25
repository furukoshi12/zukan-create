import React from 'react'
import Home from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import { Grading } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';

export const SidebarData = [
  {
    title: "MyPage",
    icon: <Home />,
    link: "/mypage",
  },
  {
    title: "Everyone's IllustratedBooks",
    icon: <ListIcon />,
    link: "/illustratedbooks",
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
