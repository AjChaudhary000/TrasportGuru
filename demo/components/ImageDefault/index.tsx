import {Image, View} from 'react-native';
import {sizeWidth} from '../../util/Size';
import React, {Component} from 'react';

import styles from './styles';

export default class ImageDefault extends Component {
  render() {
    return (
      <View style={styles.imageLoading}>
        <Image
          source={require('../../../res/images/ic_avatar_default.png')}
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
