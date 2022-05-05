import { View, Text ,LogBox} from 'react-native'
import React from 'react'
LogBox.ignoreLogs(['Require cycles']); // Ignore log notification by message
LogBox.ignoreAllLogs();

import Dialog, { DialogContent, ScaleAnimation, DialogTitle, DialogFooter, DialogButton, } from 'react-native-popup-dialog';
import color from '../contents/color';
const ActionDialogBox = (props) => {
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
            footer={
                <DialogFooter>
                    <DialogButton
                        text="CANCEL"
                        onPress={() => props.onGet(false)}
                    />
                    <DialogButton
                        text="OK"
                        onPress={() => {
                            props.onOkPress(true)
                            props.onGet(false)
                        }}
                    />
                </DialogFooter>
            }
        >
            <DialogContent>
                <View style={{ marginTop: 20 }}>
                    <Text style={{
                        fontSize: 20,
                        color: 'gray',
                        textAlign: 'center'
                    }}>{props.text}</Text>
                </View>
            </DialogContent>
        </Dialog>

    )
}
export default ActionDialogBox 
