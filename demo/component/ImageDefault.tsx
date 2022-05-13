import {Image, StyleSheet, View} from 'react-native';
import {sizeWidth} from '../util/Size';
import React, {Component} from 'react';
import {APP_BACKGROUND} from '../../res/style/AppStyle';

export default class ImageDefault extends Component {
  render() {
    return (
      <View style={styles.imageLoading}>
        <Image
          source={require('../../res/images/ic_avatar_default.png')}
          resizeMode="contain"
          style={{
            width: sizeWidth(15),
            height: sizeWidth(15),
            tintColor: '#ADADAD',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageLoading: {
    height: sizeWidth(35),
    width: sizeWidth(35),
    borderRadius: sizeWidth(100),
    backgroundColor: APP_BACKGROUND,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
