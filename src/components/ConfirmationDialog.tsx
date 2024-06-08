import React, { useState } from 'react';
import type { FC } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

interface OrgUnitsTreeProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  confirmAction: () => void;
}

const ConfirmationDialog: FC<OrgUnitsTreeProps> = (props) => {
  const { title, message, open, onClose, confirmAction } = props;

  const [processStarted, setProcessStarted] = useState<boolean>(false);

  const handleConfirmClick = async () => {
    setProcessStarted(true);
    confirmAction();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="body1"
          gutterBottom
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          disabled={processStarted}
          onClick={handleConfirmClick}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
