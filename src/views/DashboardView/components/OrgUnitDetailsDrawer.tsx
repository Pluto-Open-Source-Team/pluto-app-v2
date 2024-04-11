import React from 'react';
import type { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';

interface OrgUnitDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  ouDetails: OrgChartNodeProps;
}

const OrgUnitDetailsDrawer: FC<OrgUnitDetailsDrawerProps> = (props) => {
  const { onClose, open = false, ouDetails } = props;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: 350,
          maxWidth: 400,
        },
      }}
    >
      <Typography
        sx={{
          mt: 4,
          mb: 2,
          ml: 3,
        }}
        variant="h5"
        component="div"
      >
        {ouDetails.name}
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1">
                {ouDetails.description || 'N/A'}
              </Typography>
            }
            secondary={
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.76rem',
                }}
                variant="caption"
              >
                Description
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1">
                {ouDetails.orgUnitId.replace('id:', '') || 'N/A'}
              </Typography>
            }
            secondary={
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.76rem',
                }}
                variant="caption"
              >
                Org Unit ID
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1">
                {ouDetails.orgUnitPath || 'N/A'}
              </Typography>
            }
            secondary={
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.76rem',
                }}
                variant="caption"
              >
                OU Path
              </Typography>
            }
          />
        </ListItem>
      </List>

      <Typography
        sx={{
          textAlign: 'center',
          mb: 1,
        }}
        variant="subtitle2"
      >
        Policies Actions
      </Typography>
      <Stack
        spacing={1}
        direction="row"
        justifyContent="center"
      >
        <Button
          startIcon={<UploadOutlinedIcon />}
          variant="outlined"
        >
          Import
        </Button>
        <Button
          startIcon={<DownloadOutlinedIcon />}
          variant="outlined"
        >
          Export
        </Button>
      </Stack>
    </Drawer>
  );
};

export default OrgUnitDetailsDrawer;
