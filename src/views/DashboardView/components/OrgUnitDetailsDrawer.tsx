import React, { useCallback, useEffect, useState } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { chromePolicyApi } from '@/api/chrome-policy-api';
import { refactoOrgUnitId } from '@/utils/refactoOrgUnitId';
import { getNamespaces } from '@/utils/getNamespaces';
import { delay } from '@/utils/delay';
import { downloadJSON } from '@/utils/downloadJSON';
import { getCurrentDateTime } from '@/utils/getCurrentDateTime';
import { ResolvePoliciesResponseBody } from '@/types/policy';
import { OrgChartNodeProps } from '@/types/orgUnits';

interface OrgUnitDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  ouDetails: OrgChartNodeProps;
  uniqueKey: string;
}

const OrgUnitDetailsDrawer: FC<OrgUnitDetailsDrawerProps> = (props) => {
  const { onClose, open = false, ouDetails, uniqueKey } = props;

  const [exportingStatus, setExportingStatus] = useState<
    Record<
      string,
      {
        exporting: boolean;
        namespace: string;
        data: Record<string, ResolvePoliciesResponseBody>;
      }
    >
  >({
    [uniqueKey]: {
      exporting: false,
      namespace: '',
      data: {},
    },
  });

  const [exportCompleted, setExportCompleted] = useState<
    Record<string, boolean>
  >({
    [uniqueKey]: false,
  });

  const resolvePolicies = useCallback(
    async (namespace: string) => {
      try {
        const resolvedPoliciesResponse = await chromePolicyApi.resolvePolicies({
          policyTargetKey: {
            targetResource: refactoOrgUnitId(ouDetails.orgUnitId),
          },
          policySchemaFilter: namespace,
          pageSize: 1000,
        });

        setExportingStatus((prevState) => ({
          ...prevState,
          [uniqueKey]: {
            ...prevState[uniqueKey],
            exporting: true,
            namespace,
            data: {
              ...prevState[uniqueKey].data,
              [namespace]: resolvedPoliciesResponse,
            },
          },
        }));
      } catch (err) {
        console.log(err);
      }
    },
    [ouDetails.orgUnitId, uniqueKey],
  );

  const handleExportPolicies = useCallback(async () => {
    setExportingStatus((prevState) => ({
      ...prevState,
      [uniqueKey]: {
        exporting: true,
        namespace: '',
        data: {},
      },
    }));
    setExportCompleted((prevState) => ({
      ...prevState,
      [uniqueKey]: false,
    }));
    const filteredNamespaces = getNamespaces().filter((ns) => ns.export);

    for (const ns of filteredNamespaces) {
      await resolvePolicies(ns.name);
      await delay(1000);
    }

    setExportCompleted((prevState) => ({
      ...prevState,
      [uniqueKey]: true,
    }));
  }, [resolvePolicies, uniqueKey]);

  useEffect(() => {
    if (exportCompleted[uniqueKey] && exportingStatus[uniqueKey]?.exporting) {
      downloadJSON(
        `${uniqueKey}-resolved-policies-${getCurrentDateTime()}`,
        exportingStatus[uniqueKey].data,
      );
      setExportingStatus((prevState) => ({
        ...prevState,
        [uniqueKey]: {
          exporting: false,
          namespace: '',
          data: {},
        },
      }));
    }
  }, [exportingStatus, exportCompleted, uniqueKey]);

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
      elevation={16}
    >
      <Box
        sx={{
          ml: 'auto',
          mt: 1,
          mr: 2,
        }}
      >
        <IconButton
          aria-label="close"
          size="large"
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
      <Typography
        variant="h5"
        component="div"
        sx={{
          mb: 2,
          ml: 3,
        }}
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
          disabled={exportingStatus[uniqueKey]?.exporting}
        >
          Import
        </Button>
        <Button
          startIcon={<DownloadOutlinedIcon />}
          variant="outlined"
          onClick={handleExportPolicies}
          disabled={exportingStatus[uniqueKey]?.exporting}
        >
          Export
        </Button>
      </Stack>
      <Box
        sx={{
          mt: 4,
          ml: 2,
          mr: 2,
        }}
      >
        {exportingStatus[uniqueKey]?.exporting && (
          <Stack spacing={1}>
            <LinearProgress
              sx={{
                mb: 2,
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                mb: 2,
              }}
              variant="h6"
            >
              Exporting policies...
            </Typography>
            <Typography
              sx={{
                textAlign: 'left',
                mb: 1,
              }}
              variant="subtitle2"
            >
              <strong>Namespace: </strong>
              {exportingStatus[uniqueKey].namespace}
            </Typography>
          </Stack>
        )}
        {exportCompleted[uniqueKey] && (
          <Alert
            variant="outlined"
            severity="success"
          >
            {uniqueKey}: Export completed successfully! The file will be
            downloaded to your computer shortly.
          </Alert>
        )}
      </Box>
    </Drawer>
  );
};

export default OrgUnitDetailsDrawer;
