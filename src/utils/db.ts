import Dexie, { Table } from 'dexie';
import { PolicyTableProps } from '@/types/policy';
import { chromeOsDevicesTableProps } from '@/types/chromeOsDevices';
import { googleUserTableProps } from '@/types/user';

export class DB extends Dexie {
  policies!: Table<PolicyTableProps, string>;
  devices!: Table<chromeOsDevicesTableProps, string>;
  users!: Table<googleUserTableProps, string>;

  constructor() {
    super('pluto-app-db');
    this.version(1).stores({
      policies: '++id, orgUnitId, value.policySchema, cachedAt',
      devices: '++id, orgUnitId, &deviceId, cachedAt',
      users: '++id, orgUnitId, &userId, cachedAt',
    });
  }
}

export const db = new DB();
