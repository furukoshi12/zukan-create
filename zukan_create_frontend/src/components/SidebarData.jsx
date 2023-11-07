import React from 'react'
import {
  Home,
  Mail as MailIcon,
  Grading as GradingIcon,
  List as ListIcon,
  Create as CreateIcon,
} from '@mui/icons-material';


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
    title: "Create New IllustratedBook",
    icon: <CreateIcon />,
    link: "/new",
  },
  {
    title: "Regulation",
    icon: <GradingIcon />,
    link: "/regulation",
  },
  {
    title: "Mail",
    icon: <MailIcon />,
    link: "/mail",
  },
];
