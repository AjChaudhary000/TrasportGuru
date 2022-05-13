import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {sizeWidth} from '../util/Size';
import {IProps} from '../components/Icon/Icon_Types';

export default class Icons extends React.PureComponent<IProps> {
  render() {
    const {
      style,
      styleButton,
      source,
      onPress,
      onPressIn,
      onPressOut,
      resizeMode,
      inheritParentStyle = false,
      activeOpacity,
      borderRadius = 0,
    } = this.props;

    return (
      <TouchableOpacity
        style={[inheritParentStyle ? {} : styles.container, styleButton]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={activeOpacity}
        disabled={!onPress && !onPressIn && !onPressOut}>
        <Image
          source={source as ImageSourcePropType}
          borderRadius={borderRadius || 0}
          resizeMode={resizeMode || 'contain'}
          style={[styles.icon, style]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: sizeWidth(12),
    width: sizeWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: sizeWidth(5),
    width: sizeWidth(5),
  },
});
