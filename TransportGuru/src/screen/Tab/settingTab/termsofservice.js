import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { HeaderWithBackButton } from '../../../components/header';
import color from '../../../contents/color';
const Termsofservice = props => {
    return (
        <View style={styles.container(props)}>
            <HeaderWithBackButton
                name={'Terms of service'}
                navigation={props.navigation}
            />
        </View>
    );
};
const useSelector = state => ({
    theme: state.token.theme,
});
export default connect(useSelector)(Termsofservice);
const styles = StyleSheet.create({
    container: props => [
        {
            flex: 1,
            backgroundColor: props.theme
                ? color.drakBackgroundColor
                : color.backgroundColor,
        },
    ],
});
