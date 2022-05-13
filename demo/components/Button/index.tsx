import React, {Component} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {COLOR_APP_BLACK} from '../../../res/style/AppStyle';
import Text from '../Text';
import {sizeWidth} from '../../util/Size';
import Fontello from '../Fontello';

import styles from './styles';
import {IProps} from './Button_Types';

export default class Button extends Component<IProps> {
  static defaultProps = {
    configLeft: {
      color: COLOR_APP_BLACK,
      size: sizeWidth(4),
      style: {
        marginRight: sizeWidth(3),
      },
    },
    configRight: {
      color: COLOR_APP_BLACK,
      size: sizeWidth(4),
      style: {
        marginLeft: sizeWidth(3),
      },
    },
  };

  render() {
    const {
      style,
      configLeft,
      configRight,
      textStyle,
      onPress,
      disabled,
      text,
      iconRight,
      iconLeft,
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, style as StyleProp<ViewStyle>]}
        onPress={onPress}
        disabled={disabled}>
        {iconLeft && (
          <Fontello
            name={iconLeft}
            color={configLeft.color}
            size={configLeft.size}
            style={configLeft.style ? configLeft.style : {}}
          />
        )}
        {this.props.children || (
          <Text style={[styles.TextInside, textStyle]}>{text}</Text>
        )}
        {iconRight && (
          <Fontello
            name={iconRight}
            color={configRight.color}
            size={configRight.size}
            style={configRight.style ? configRight.style : {}}
          />
        )}
      </TouchableOpacity>
    );
  }
}
