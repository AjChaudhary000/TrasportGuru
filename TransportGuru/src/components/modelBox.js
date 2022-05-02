import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import color from '../contents/color';

const ModelBox = (props) => {
    const [modalVisible, setModalVisible] = React.useState(props.modalVisibleData);
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: props.theme ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)' }}>
                <View style={styles.modelBox(props)}>
                    {props.children}
                </View>
            </View>
        </Modal>

    )
}

export default ModelBox
const styles = StyleSheet.create({
    modelBox: (props) => [{
        width: Dimensions.get('screen').width - 20,
    minHeight: 200,
    alignSelf: 'center',
    backgroundColor: props.theme ? color.drakBackgroundColor : color.backgroundColor,
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: props.theme ? color.drakFontcolor : color.fontcolor,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    }],
})