export interface chromeOsDevicesProps {
  kind: string;
  deviceId: string;
}

export interface chromeOsDevicesResponseProps {
  kind: string;
  etag: string;
  chromeosdevices: chromeOsDevicesProps[];
}

export interface chromeOsDevicesTableProps extends chromeOsDevicesProps {
  id?: string;
  orgUnitId: string;
  cachedAt: string;
}
