import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { HeaderWithBackButton } from '../../../components/header';
import { WebView } from 'react-native-webview';
import color from '../../../contents/color';
const PrivacyPolicy = props => {
    return (
        <View style={styles.container(props)}>
            <HeaderWithBackButton
                name={'Privacy Policy'}
                navigation={props.navigation}
            />
            <WebView
                source={{
                    uri: 'https://lx-crypto-app.netlify.app/',
                }}
            />
        </View>
    );
};

const useSelector = state => ({
    theme: state.token.theme,
});
export default connect(useSelector)(PrivacyPolicy);
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
