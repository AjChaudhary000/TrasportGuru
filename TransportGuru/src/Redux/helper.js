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
export const saveTheme = async (theme) => {
    await AsyncStorage.setItem('@userthemeData', theme.toString());
};
export const getTheme = async () => {
    try{
        return await AsyncStorage.getItem('@userthemeData') ;
    }catch(e){
        console.log(e)
    }
    
};