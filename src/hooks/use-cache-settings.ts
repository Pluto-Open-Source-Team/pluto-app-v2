import React, { useState } from 'react';

interface CacheSettings {
  enableCaching: boolean;
  clearDataOnSignOut: boolean;
}

const useCacheSettings = (): [
  CacheSettings,
  React.Dispatch<React.SetStateAction<CacheSettings>>,
] => {
  const [cacheSettings, setCacheSettings] = useState<CacheSettings>(() => {
    const cachedSettings = localStorage.getItem('CACHE_SETTINGS');

    try {
      return cachedSettings
        ? JSON.parse(cachedSettings)
        : {
            enableCaching: true,
            clearDataOnSignOut: false,
          };
    } catch (error) {
      return {
        enableCaching: true,
        clearDataOnSignOut: false,
      };
    }
  });

  const updateCacheSettings = (newSettings: CacheSettings) => {
    localStorage.setItem('CACHE_SETTINGS', JSON.stringify(newSettings));
    setCacheSettings(newSettings);
  };

  return [cacheSettings, updateCacheSettings];
};

export default useCacheSettings;
