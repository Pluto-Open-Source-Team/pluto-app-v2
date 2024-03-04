import type { FC } from 'react';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { GoogleIcon } from '@/assets/svg-icons/GoogleIcon';
import { useAuth } from '@/hooks/use-auth';

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

  const auth = useAuth();

  const [connectingWithGoogle, setConnectingWithGoogle] =
    useState<boolean>(false);

  const [googleAuthError, setGoogleAuthError] = useState<{
    display: boolean;
    message: string;
  }>({
    display: false,
    message: 'Something went wrong with authentication.',
  });

  const initialValues = {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  };

  const validationSchema = yup.object({
    clientId: yup
      .string()
      .trim()
      .min(10, 'Please enter a valid Client ID')
      .required('Please specify a Client ID'),
  });

  const handleGoogle = async (response) => {
    try {
      if (response && response.access_token) {
        await auth.login(response.access_token);
        onClose();
      }
      setConnectingWithGoogle(false);
    } catch (err) {
      setConnectingWithGoogle(false);
      console.log(`Error: ${err.message}`);
    }
  };

  const handleGoogleError = (error) => {
    if (error.type === 'popup_closed') {
      setGoogleAuthError({
        display: true,
        message: 'The popup window is closed before authentication finished.',
      });
    } else if (error.type === 'popup_failed_to_open') {
      setGoogleAuthError({
        display: true,
        message: 'The popup window is failed to open',
      });
    } else {
      setGoogleAuthError({
        display: true,
        message: 'Something went wrong with authentication.',
      });
    }
    setConnectingWithGoogle(false);
  };

  const handleInitGoogle = (clientId: string) => {
    const interval = setInterval(() => {
      const google = (window as any).google;

      if (google) {
        clearInterval(interval);
        const googleClient = google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope:
            'https://www.googleapis.com/auth/admin.directory.orgunit.readonly',
          prompt: 'consent',
          callback: handleGoogle,
          error_callback: handleGoogleError,
        });

        googleClient.requestAccessToken();
      }
    }, 300);
  };

  const onSubmit = (values) => {
    setConnectingWithGoogle(true);
    handleInitGoogle(values.clientId);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

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
        <Box paddingBottom={2}>
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
              You can use the default Client ID to authenticate. To generate a
              new one find the instructions &nbsp;
              <a
                href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid"
                target="_blank"
              >
                here
              </a>
              .
            </Typography>
          </TipRoot>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              label="Client ID"
              placeholder="xxxxxxxxxx-xxxxxxxxxx.apps.googleusercontent.com"
              name="clientId"
              value={formik.values.clientId}
              onChange={formik.handleChange}
              error={formik.touched.clientId && Boolean(formik.errors.clientId)}
              // @ts-ignore
              helperText={formik.touched.clientId && formik.errors.clientId}
            />
          </Grid>
          {googleAuthError.display && (
            <Grid
              item
              xs={12}
              marginTop={2}
            >
              <Alert severity="error">{googleAuthError.message}</Alert>
            </Grid>
          )}
          <Grid
            container
            justifyContent="flex-end"
            marginTop={2}
          >
            <Button
              variant="outlined"
              sx={{ display: { xs: 'none', md: 'flex' } }}
              startIcon={<GoogleIcon />}
              type="submit"
              disabled={connectingWithGoogle}
            >
              {connectingWithGoogle ? (
                <>
                  <CircularProgress
                    size={20}
                    sx={{
                      marginRight: 1,
                    }}
                  />
                  Connecting with Google
                </>
              ) : (
                'Continue with Google'
              )}
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
