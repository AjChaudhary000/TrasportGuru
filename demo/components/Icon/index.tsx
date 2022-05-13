import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {IProps} from './Icon_Types';
import styles from './styles';

export default class Icons extends React.PureComponent<IProps> {
  render() {
    const {style, styleButton, source, onPress, resizeMode} = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, styleButton]}
        onPress={onPress}
        disabled={!onPress}>
        <Image
          source={source as ImageSourcePropType}
          resizeMode={resizeMode || 'contain'}
          style={[styles.icon, style]}
        />
      </TouchableOpacity>
    );
  }
}
