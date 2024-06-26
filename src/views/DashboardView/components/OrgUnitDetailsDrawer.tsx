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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { chromePolicyApi } from '@/api/chrome-policy-api';
import { directoryApi } from '@/api/directory-api';
import { refactoOrgUnitId } from '@/utils/refactoOrgUnitId';
import { getNamespaces } from '@/utils/getNamespaces';
import { delay } from '@/utils/delay';
import { downloadJSON } from '@/utils/downloadJSON';
import { getCurrentDateTime } from '@/utils/getCurrentDateTime';
import { PolicyTableProps } from '@/types/policy';
import { OrgChartNodeProps } from '@/types/orgUnits';
import { useStore } from '@/hooks/use-store';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import useCacheSettings from '@/hooks/use-cache-settings';
import RefreshIcon from '@mui/icons-material/Refresh';
import { chromeOsDevicesTableProps } from '@/types/chromeOsDevices';
import { keyframes } from '@emotion/react';
import { googleUserTableProps } from '@/types/user';

interface OrgUnitDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  ouDetails: OrgChartNodeProps;
  uniqueKey: string;
}

const OrgUnitDetailsDrawer: FC<OrgUnitDetailsDrawerProps> = (props) => {
  const { onClose, open = false, ouDetails, uniqueKey } = props;

  const [cacheSettings] = useCacheSettings();

  const {
    bulkPutPolicies,
    useLivePoliciesByOrgUnitId,
    deleteAllPoliciesByOrgUnitId,
    useLivePoliciesCountByOrgUnitId,
    bulkPutDevices,
    useLiveDevicesCountByOrgUnitId,
    bulkPutUsers,
    useLiveUsersCountByOrgUnitId,
  } = useStore();

  const liveStoredPolicies =
    useLivePoliciesByOrgUnitId(ouDetails.orgUnitId) || [];

  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const [exportingStatus, setExportingStatus] = useState<
    Record<
      string,
      {
        exporting: boolean;
        namespace: string;
        data: Record<string, PolicyTableProps[]>;
      }
    >
  >({
    [uniqueKey]: {
      exporting: false,
      namespace: '...',
      data: {},
    },
  });

  const [devicesUsersStatus, setDevicesUsersStatus] = useState<
    Record<
      string,
      {
        loading: boolean;
        devicesData: chromeOsDevicesTableProps[];
        usersData: googleUserTableProps[];
      }
    >
  >({
    [uniqueKey]: {
      loading: false,
      devicesData: [],
      usersData: [],
    },
  });

  const [exportCompleted, setExportCompleted] = useState<
    Record<string, boolean>
  >({
    [uniqueKey]: false,
  });

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const invalidateCache = useCallback(async () => {
    try {
      await deleteAllPoliciesByOrgUnitId(ouDetails.orgUnitId);
      handleCloseDeleteModal();
    } catch (err) {
      console.log(err);
    }
  }, [ouDetails.orgUnitId]);

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

        if (
          resolvedPoliciesResponse &&
          resolvedPoliciesResponse.resolvedPolicies
        ) {
          const formattedPolicies =
            resolvedPoliciesResponse.resolvedPolicies.map((_policy) => ({
              ..._policy,
              orgUnitId: ouDetails.orgUnitId,
              id: uuidv4(),
              namespace,
              cachedAt: getCurrentDateTime(),
            }));

          if (cacheSettings.enableCaching) {
            await bulkPutPolicies(formattedPolicies);
          }

          setExportingStatus((prevState) => ({
            ...prevState,
            [uniqueKey]: {
              ...prevState[uniqueKey],
              exporting: true,
              namespace,
              data: {
                ...prevState[uniqueKey].data,
                [namespace]: formattedPolicies,
              },
            },
          }));
        }
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
        namespace: '...',
        data: {},
      },
    }));
    setExportCompleted((prevState) => ({
      ...prevState,
      [uniqueKey]: false,
    }));

    if (liveStoredPolicies && liveStoredPolicies.length > 0) {
      const groupedPolicies = liveStoredPolicies.reduce((acc, policy) => {
        (acc[policy.namespace] = acc[policy.namespace] || []).push(policy);
        return acc;
      }, {});

      setExportingStatus((prevState) => ({
        ...prevState,
        [uniqueKey]: {
          ...prevState[uniqueKey],
          exporting: true,
          namespace: 'All',
          data: groupedPolicies,
        },
      }));
      setExportCompleted((prevState) => ({
        ...prevState,
        [uniqueKey]: true,
      }));
    } else {
      const filteredNamespaces = getNamespaces().filter((ns) => ns.export);

      for (const ns of filteredNamespaces) {
        await resolvePolicies(ns.name);
        await delay(1000);
      }

      setExportCompleted((prevState) => ({
        ...prevState,
        [uniqueKey]: true,
      }));
    }
  }, [resolvePolicies, uniqueKey, liveStoredPolicies]);

  const handleGetDevicesCount = useCallback(async () => {
    try {
      setDevicesUsersStatus((prevState) => ({
        ...prevState,
        [uniqueKey]: {
          ...prevState[uniqueKey],
          loading: true,
          devicesData: [],
        },
      }));
      const listDevicesResponse =
        await directoryApi.listChromeOsDevicesByOrgUnitId(ouDetails.orgUnitId);

      if (listDevicesResponse && listDevicesResponse.chromeosdevices) {
        const formattedDevices = listDevicesResponse.chromeosdevices.map(
          (_device) => ({
            kind: _device.kind,
            deviceId: _device.deviceId,
            id: uuidv4(),
            orgUnitId: uniqueKey,
            cachedAt: getCurrentDateTime(),
          }),
        );

        if (cacheSettings.enableCaching) {
          await bulkPutDevices(formattedDevices);
        }

        setDevicesUsersStatus((prevState) => ({
          ...prevState,
          [uniqueKey]: {
            ...prevState[uniqueKey],
            loading: false,
            devicesData: formattedDevices,
          },
        }));
      } else {
        setDevicesUsersStatus((prevState) => ({
          ...prevState,
          [uniqueKey]: {
            ...prevState[uniqueKey],
            loading: false,
            devicesData: [],
          },
        }));
      }
    } catch (err) {
      setDevicesUsersStatus((prevState) => ({
        ...prevState,
        [uniqueKey]: {
          ...prevState[uniqueKey],
          loading: false,
          devicesData: [],
        },
      }));
    }
  }, [ouDetails.orgUnitId]);

  const handleGetUsersCount = useCallback(async () => {
    try {
      setDevicesUsersStatus((prevState) => ({
        ...prevState,
        [uniqueKey]: {
          ...prevState[uniqueKey],
          loading: true,
          usersData: [],
        },
      }));
      const listUsersResponse = await directoryApi.listGoogleUsersByOrgUnitPath(
        ouDetails.orgUnitPath,
      );

      if (listUsersResponse && listUsersResponse.users) {
        const formattedUsers = listUsersResponse.users.map((_user) => ({
          userId: _user.id,
          id: uuidv4(),
          orgUnitId: uniqueKey,
          cachedAt: getCurrentDateTime(),
        }));

        if (cacheSettings.enableCaching) {
          await bulkPutUsers(formattedUsers);
        }

        setDevicesUsersStatus((prevState) => ({
          ...prevState,
          [uniqueKey]: {
            ...prevState[uniqueKey],
            loading: false,
            usersData: formattedUsers,
          },
        }));
      } else {
        setDevicesUsersStatus((prevState) => ({
          ...prevState,
          [uniqueKey]: {
            ...prevState[uniqueKey],
            loading: false,
            usersData: [],
          },
        }));
      }
    } catch (err) {
      setDevicesUsersStatus((prevState) => ({
        ...prevState,
        [uniqueKey]: {
          ...prevState[uniqueKey],
          loading: false,
          usersData: [],
        },
      }));
    }
  }, [ouDetails.orgUnitId]);

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

  const policiesCachedTimestamp =
    liveStoredPolicies.length > 0 ? liveStoredPolicies[0].cachedAt : null;

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
        <ListItem
          secondaryAction={
            <Tooltip title="Refresh users count">
              <IconButton
                edge="end"
                aria-label="refresh"
                color="primary"
                size="large"
                onClick={handleGetUsersCount}
                disabled={devicesUsersStatus[uniqueKey]?.loading}
              >
                <RefreshIcon
                  sx={{
                    animation: devicesUsersStatus[uniqueKey]?.loading
                      ? `${rotate} 0.5s linear infinite`
                      : '',
                  }}
                />
              </IconButton>
            </Tooltip>
          }
        >
          <ListItemText
            primary={
              <Typography variant="body1">
                {useLiveUsersCountByOrgUnitId(ouDetails.orgUnitId) || '--'}
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
                Users
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          secondaryAction={
            <Tooltip title="Refresh devices count">
              <IconButton
                edge="end"
                aria-label="refresh"
                color="primary"
                size="large"
                onClick={handleGetDevicesCount}
                disabled={devicesUsersStatus[uniqueKey]?.loading}
              >
                <RefreshIcon
                  sx={{
                    animation: devicesUsersStatus[uniqueKey]?.loading
                      ? `${rotate} 0.5s linear infinite`
                      : '',
                  }}
                />
              </IconButton>
            </Tooltip>
          }
        >
          <ListItemText
            primary={
              <Typography variant="body1">
                {useLiveDevicesCountByOrgUnitId(ouDetails.orgUnitId) || '--'}
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
                Devices
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1">
                {useLivePoliciesCountByOrgUnitId(ouDetails.orgUnitId) || '--'}
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
                Policies
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          secondaryAction={
            policiesCachedTimestamp && (
              <Tooltip title="Clear cached data">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  color="error"
                  size="large"
                  onClick={handleOpenDeleteModal}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            )
          }
        >
          <ListItemText
            primary={
              <Typography variant="body1">
                {policiesCachedTimestamp || 'N/A'}
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
                Cached Policies At
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
          disabled
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
              Exporting policies for {ouDetails.name}...
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
            Export completed successfully! The file will be downloaded shortly.
          </Alert>
        )}
      </Box>

      {openDeleteModal && (
        <ConfirmationDialog
          key={ouDetails.orgUnitId}
          title="Clear Cache"
          message={`This will clear "${ouDetails.name}" cached data.`}
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          confirmAction={invalidateCache}
        />
      )}
    </Drawer>
  );
};

export default OrgUnitDetailsDrawer;
