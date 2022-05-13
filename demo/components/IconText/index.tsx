import React, {Component} from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import AppText from '../Text';

import styles from './styles';
import {IProps} from './IconText_Types';

export default class IconText extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  renderIcon = (icon: ImageSourcePropType) => {
    const {styleIcon} = this.props;
    if (icon) {
      return (
        <Image
          source={icon}
          resizeMode="contain"
          style={[styles.icon, styleIcon]}
        />
      );
    }
  };

  render() {
    const {style, icon, text, onPress, disabled, styleText} = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}>
        {this.renderIcon(icon as ImageSourcePropType)}
        <AppText style={[styles.text, styleText]}>{text}</AppText>
      </TouchableOpacity>
    );
  }
}
