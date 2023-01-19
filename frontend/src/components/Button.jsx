import React from 'react';
import { Button } from '@mui/material';

export default function CustomButton({ onClick, children }) {
  return (
    <Button onClick={onClick} variant="contained">
      {children}
    </Button>
  );
}
