import { ReactiveVar } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isString from 'lodash/isString';

const getCleanValueForStorage = (value: unknown) => {
  return isString(value) ? value : JSON.stringify(value);
};

export const getVarPersisted = async <T>(rv: ReactiveVar<T>, storageName: string) => {
  let value: T | undefined;

  // Try to fetch the value from local storage
  const previousValue = await AsyncStorage.getItem(storageName);

  if (previousValue !== null) {
    try {
      const parsed = await JSON.parse(previousValue);
      value = parsed;
    } catch {
      // It wasn't JSON, assume a valid value
      value = previousValue as unknown as T;
    }
  }

  value !== undefined && rv(value);

  const onNextChange = (newValue: T | undefined) => {
    try {
      if (newValue === undefined) {
        AsyncStorage.removeItem(storageName);
      } else {
        AsyncStorage.setItem(storageName, getCleanValueForStorage(newValue));
      }
    } catch (err) {}

    // Re-register for the next change
    rv.onNextChange(onNextChange);
  };

  // Register for the first change
  rv.onNextChange(onNextChange);
};
