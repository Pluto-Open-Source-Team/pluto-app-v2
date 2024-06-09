import Dexie, { Table } from 'dexie';
import { PolicyTableProps } from '@/types/policy';
import { chromeOsDevicesTableProps } from '@/types/chromeOsDevices';

export class DB extends Dexie {
  policies!: Table<PolicyTableProps, string>;
  devices!: Table<chromeOsDevicesTableProps, string>;

  constructor() {
    super('pluto-app-db');
    this.version(1).stores({
      policies: '++id, orgUnitId, value.policySchema, cachedAt',
      devices: '++id, orgUnitId, &deviceId, cachedAt',
    });
  }
}

export const db = new DB();
