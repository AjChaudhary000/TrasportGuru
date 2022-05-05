import { View, Text, LogBox } from 'react-native'
import React from 'react'
LogBox.ignoreLogs(['Require cycles']); // Ignore log notification by message
LogBox.ignoreAllLogs();

import Dialog, { DialogContent, ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
import color from '../contents/color';
const DialogBox = (props) => {
    return (
        <Dialog
            onTouchOutside={() => {
                props.onGet(false)
            }}
            width={0.95}
            minHeight={300}
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
                <View style={{ marginTop: 20 }}>
                    {props.children}
                </View>
            </DialogContent>
        </Dialog>

    )
}
export default DialogBox 
