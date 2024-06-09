import { db } from '@/utils/db';
import { PolicyTableProps } from '@/types/policy';
import { useLiveQuery } from 'dexie-react-hooks';
import { chromeOsDevicesTableProps } from '@/types/chromeOsDevices';

export const useStore = () => {
  const bulkPutPolicies = async (policies: PolicyTableProps[]) => {
    await db.policies.bulkPut(policies);
  };

  const useLivePoliciesByOrgUnitId = (orgUnitId: string) => {
    return useLiveQuery(
      () => db.policies.where('orgUnitId').equals(orgUnitId).toArray(),
      [orgUnitId],
    );
  };

  const useLivePoliciesCountByOrgUnitId = (orgUnitId: string) => {
    return useLiveQuery(
      () => db.policies.where('orgUnitId').equals(orgUnitId).count(),
      [orgUnitId],
    );
  };

  const deleteAllPoliciesByOrgUnitId = async (orgUnitId: string) => {
    await db.policies.where('orgUnitId').equals(orgUnitId).delete();
  };

  const deleteAllRecords = async () => {
    await db.delete({ disableAutoOpen: false });
  };

  const bulkPutDevices = async (devices: chromeOsDevicesTableProps[]) => {
    await db.devices.bulkPut(devices);
  };

  const useLiveDevicesCountByOrgUnitId = (orgUnitId: string) => {
    return useLiveQuery(
      () => db.devices.where('orgUnitId').equals(orgUnitId).count(),
      [orgUnitId],
    );
  };

  return {
    bulkPutPolicies,
    useLivePoliciesByOrgUnitId,
    useLivePoliciesCountByOrgUnitId,
    deleteAllPoliciesByOrgUnitId,
    deleteAllRecords,
    bulkPutDevices,
    useLiveDevicesCountByOrgUnitId,
  };
};
