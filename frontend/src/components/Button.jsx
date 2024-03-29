import React from 'react';
import { Button } from '@mui/material';

export default function CustomButton({ onClick, children, style }) {
  return (
    <Button onClick={onClick} variant="contained" style={style}>
      {children}
    </Button>
  );
}
