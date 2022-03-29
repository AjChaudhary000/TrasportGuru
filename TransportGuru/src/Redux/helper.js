import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveJWTToken = async (token) => {
    await AsyncStorage.setItem('@usertoken', token);
};
export const removeJWTToken = async () => {
    await AsyncStorage.removeItem('@usertoken');
};
export const getJWTToken = async () => {
    return await AsyncStorage.getItem('@usertoken');
};