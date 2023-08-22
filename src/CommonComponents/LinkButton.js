import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Button,ListItemButton }from '@mui/material';

export default function CustomLinkButton ({ to, children, ...props }) {
  return (
    <Button component={RouterLink} to={to} {...props}>
      {children}
    </Button>
  );
};

export const CustomListLinkButton = ({ to, children, ...props }) => {
    return (
      <ListItemButton component={RouterLink} to={to} {...props}>
        {children}
      </ListItemButton>
    );
  };

