import { NamespaceProps } from '@/types/namespace';

const namespacesData: NamespaceProps[] = [
  {
    name: 'chrome.users.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.users.apps.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.users.appsconfig.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.devices.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.devices.managedguest.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.devices.managedguest.apps.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.devices.kiosk.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.devices.kiosk.apps.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.devices.kiosk.appsconfig.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.printers.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.printservers.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.networks.globalsettings.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.networks.wifi.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.networks.ethernet.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.networks.vpn.*',
    export: true,
    import: false,
  },
  {
    name: 'chrome.networks.certificates.*',
    export: true,
    import: false,
  },
];

export const getNamespaces = (): NamespaceProps[] => {
  return namespacesData;
};
