import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

export default function Alerts(props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity="success" onClose={() => {}}>{props.children}</Alert>
    </Stack>
  );
}