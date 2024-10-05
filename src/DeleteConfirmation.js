import React from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

function DeleteConfirmation({ open, handleClose, handleConfirm }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Are you sure you want to delete this user?
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmation;
