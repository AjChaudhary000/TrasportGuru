import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR_APP_BLACK} from '../../res/style/AppStyle';
import Text from './Text';
import {sizeFont, sizeWidth} from '../util/Size';
import Fontello from './Fontello';
import {Fonts} from '../../res/themes';
import {IProps} from '../components/Button/Button_Types';

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
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}>
        {iconLeft && (
          <Fontello
            name={iconLeft}
            color={configLeft.color}
            size={configLeft.size}
            style={configLeft.style || {}}
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
            style={configRight.style || {}}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(3.5),
    backgroundColor: COLOR_APP_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: sizeWidth(2),
    elevation: 1,
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.1,
  },
  TextInside: {
    textAlign: 'center',
    flex: 1,
    fontSize: sizeFont(3.7),
    textTransform: 'uppercase',
    fontFamily: Fonts.type.OpenSansDisplaySemiBold,
  },
});
