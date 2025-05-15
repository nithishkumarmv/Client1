// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const json = await AsyncStorage.getItem('user');
  return JSON.parse(json);
};

export const removeUser = async () => {
  await AsyncStorage.removeItem('user');
};
