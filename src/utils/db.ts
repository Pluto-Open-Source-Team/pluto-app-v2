import Dexie, { Table } from 'dexie';
import { PolicyTableProps } from '@/types/policy';

export class DB extends Dexie {
  policies!: Table<PolicyTableProps, string>;

  constructor() {
    super('pluto-app-db');
    this.version(1).stores({
      policies: '++id, orgUnitId, value.policySchema, cachedAt',
    });
  }
}

export const db = new DB();
