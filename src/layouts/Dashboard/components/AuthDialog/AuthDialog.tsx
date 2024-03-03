import type { FC } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
} from '@mui/material';

const TipRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#F3F4F6',
  borderRadius: 8,
  display: 'flex',
  padding: theme.spacing(1),
}));

interface AuthDialogProps {
  onClose: () => void;
  open: boolean;
}

const AuthDialog: FC<AuthDialogProps> = (props) => {
  const { onClose, open = false, ...other } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Google Authentication</Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <SvgIcon>
            <CloseIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent>
        <TipRoot>
          <Typography
            color="text.secondary"
            sx={{
              alignItems: 'center',
              '& span': {
                fontWeight: 700,
                mr: 0.5,
              },
            }}
            variant="caption"
          >
            You can use the default Client ID to authenticate. To generate a new
            one find the instructions &nbsp;
            <a
              href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid"
              target="_blank"
            >
              here
            </a>
            .
          </Typography>
        </TipRoot>
        <Box
          component="form"
          sx={{ mt: 3 }}
        >
          <TextField
            fullWidth
            label="Client ID"
            placeholder="xxxxxxxxxx-xxxxxxxxxx.apps.googleusercontent.com"
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
