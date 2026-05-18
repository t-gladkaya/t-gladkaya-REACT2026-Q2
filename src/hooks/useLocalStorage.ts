import React from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = React.useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const saveValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, saveValue] as const;
};
