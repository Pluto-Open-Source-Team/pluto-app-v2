export const appSettings = {
  googleClientId:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    '755658537555-sa1nrh6sf1oudu6frbtmp7luov8nrk3d.apps.googleusercontent.com',
};

export const googleSettings = {
  scope:
    'https://www.googleapis.com/auth/admin.directory.orgunit.readonly ' +
    'email profile ' +
    'https://www.googleapis.com/auth/chrome.management.policy ' +
    'https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly',
};
