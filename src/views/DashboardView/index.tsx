import React, { useEffect, useCallback, useState } from 'react';
import type { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Dashboard from '@/layouts/Dashboard';
import OrgUnitsTree from '@/views/DashboardView/components/OrgUnitsTree';
import OrgUnitDetailsDrawer from '@/views/DashboardView/components/OrgUnitDetailsDrawer';
import { useAuth } from '@/hooks/use-auth';
import { directoryApi } from '@/api/directory-api';
import { useMounted } from '@/hooks/use-mounted';
import { makeOrgUnitsTreeData } from '@/utils/buildOrgChartTreeData';

const DashboardView: FC = () => {
  const auth = useAuth();
  const isMounted = useMounted();

  const [orgUnits, setOrgUnits] = useState<OrgChartNodeProps>({
    description: '',
    orgUnitPath: '',
    name: '',
    orgUnitId: '',
  });
  const [ouDetailsDrawerOpenStatus, setOuDetailsDrawerOpenStatus] =
    useState<boolean>(false);
  const [ouDetails, setOuDetails] = useState<OrgChartNodeProps>({
    attributes: {
      users: 'N/A',
      devices: 'N/A',
      policies: 'N/A',
    },
    name: 'N/A',
    orgUnitId: 'N/A',
    description: '',
    orgUnitPath: '',
  });

  const closeOUDetailsDrawer = () => {
    setOuDetailsDrawerOpenStatus(false);
  };

  const openOUDetailsDrawer = (ouDetails: OrgChartNodeProps) => {
    setOuDetailsDrawerOpenStatus(true);
    setOuDetails(ouDetails);
  };

  const getOrgUnits = useCallback(async () => {
    try {
      const orgUnitsResponse = await directoryApi.listOrganizationalUnits();

      if (isMounted()) {
        const formattedOrgUnitsData = makeOrgUnitsTreeData(
          orgUnitsResponse.organizationUnits,
        );

        setOrgUnits(formattedOrgUnitsData);
      }
    } catch (err) {
      if (isMounted()) {
        setOrgUnits({
          orgUnitId: '',
          name: '',
          description: '',
          orgUnitPath: '',
        });
      }
    }
  }, [isMounted]);

  useEffect(() => {
    getOrgUnits();
  }, [auth.isAuthenticated]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Dashboard>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={1}
          height={1}
          minHeight={800}
          borderRadius={2}
          border={`2px solid rgba(0, 0, 0, 0.12)`}
          sx={{
            borderStyle: 'dashed',
            overflow: 'auto',
          }}
        >
          {auth && auth.isAuthenticated ? (
            <div
              id="treeWrapper"
              style={{ width: '100em', height: '50em' }}
            >
              <OrgUnitsTree
                data={orgUnits}
                openOUDetailsDrawer={openOUDetailsDrawer}
              />
            </div>
          ) : (
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
          )}
        </Box>
      </Dashboard>

      <OrgUnitDetailsDrawer
        open={ouDetailsDrawerOpenStatus}
        onClose={closeOUDetailsDrawer}
        ouDetails={ouDetails}
      />
    </Box>
  );
};

export default DashboardView;
