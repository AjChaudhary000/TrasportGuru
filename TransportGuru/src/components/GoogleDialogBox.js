import { ScrollView, LogBox } from 'react-native'
import React from 'react'
import Dialog, { DialogContent, ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import color from '../contents/color';
import config from '../config/config';
LogBox.ignoreLogs(['Require cycles']); // Ignore log notification by message
LogBox.ignoreAllLogs();
const GoogleDialogBox = (props) => {
    return (

        <Dialog
            onTouchOutside={() => {
                props.onGet(false)
            }}
            width={0.95}
            dialogTitle={<DialogTitle title={props.title} />}
            visible={props.modalVisibleData}
            dialogAnimation={new ScaleAnimation()}
            onHardwareBackPress={() => {
                props.onGet(false)
            }}
            containerStyle={{ backgroundColor: props.theme ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)' }}
            dialogStyle={{ backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor, }}
        >
            <DialogContent>
                <ScrollView style={{ marginTop: 20 }} keyboardShouldPersistTaps="handled">
                    <GooglePlacesAutocomplete
                        placeholder={`eg : ${props.setPlaceTypeData}`}
                        placeholderTextColor={'gray'}
                        minLength={2} // minimum length of text to search
                        fetchDetails={true}
                        autoFocus={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(dt, details = null) => {
                            props.onGetData({ name: dt.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng });
                            props.onGet(false)
                        }}
                        getDefaultValue={() => {
                            return ''; // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: config.GooglePlaceAPI,
                            language: 'en', // language of the results
                            types: '(cities)',
                            // default: 'geocode'
                        }}
                        styles={{

                            textInput: {
                                borderWidth: 2,
                                borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
                                padding: 10,
                                fontSize: 18,
                                borderRadius: 5,
                                marginHorizontal: 10,
                                color: props.theme ? color.drakFontcolor : color.fontcolor,
                                backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
                            },
                            description: {
                                color: props.theme ? color.drakPrimaryColors : color.primaryColors,
                                fontSize: 18,

                            }, listView: {
                                borderWidth: 2,
                                borderColor: props.theme ? color.drakPrimaryColors : color.primaryColors,
                                padding: 10,
                                fontSize: 18,
                                borderRadius: 10,
                            }
                        }}

                        debounce={200}
                    />
                </ScrollView>
            </DialogContent>
        </Dialog>

    )
}
export default GoogleDialogBox 
