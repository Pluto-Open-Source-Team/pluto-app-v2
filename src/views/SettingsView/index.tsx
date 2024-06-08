import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Dashboard from '@/layouts/Dashboard';
import { useAuth } from '@/hooks/use-auth';
import useCacheSettings from '@/hooks/use-cache-settings';

const SettingsView: FC = () => {
  const auth = useAuth();
  const [cacheSettings, updateCacheSettings] = useCacheSettings();

  const handleChangeCacheSettings = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, checked } = event.target;
    const newSettings = { ...cacheSettings, [name]: checked };
    updateCacheSettings(newSettings);
  };

  useEffect(() => {}, []);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Dashboard>
        {auth && auth.isAuthenticated ? (
          <Box>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', md: 'row' }}
              justifyContent={'space-between'}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
              >
                General settings
              </Typography>
            </Box>
            <Box paddingY={4}>
              <Divider />
            </Box>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                md={12}
              >
                <Typography variant="h6">Caching settings</Typography>
                <Typography variant="caption">
                  Pluto uses client-side storage IndexedDB to cache app data
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={cacheSettings.enableCaching}
                      onChange={handleChangeCacheSettings}
                      name="enableCaching"
                    />
                  }
                  label={
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                    >
                      Enable data caching
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={cacheSettings.clearDataOnSignOut}
                      onChange={handleChangeCacheSettings}
                      name="clearDataOnSignOut"
                    />
                  }
                  label={
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                    >
                      Clear data on user sign out
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={1}
            height={1}
            minHeight={800}
            sx={{
              overflow: 'auto',
            }}
          >
            <Box
              width={1}
              height={1}
              data-aos={'fade-up'}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Typography
                  variant={'h6'}
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                  align={'center'}
                >
                  You are not connected with your Google Admin
                </Typography>
                <Typography
                  align={'center'}
                  color="text.secondary"
                >
                  Login with your Google Admin Account to continue
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Dashboard>
    </Box>
  );
};

export default SettingsView;
