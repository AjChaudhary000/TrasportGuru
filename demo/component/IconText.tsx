import React, {Component} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {sizeWidth} from '../util/Size';
import AppText from './Text';
import {IProps} from '../components/IconText/IconText_Types';

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
        {icon && this.renderIcon(icon)}
        <AppText style={[styles.text, styleText]}>{text}</AppText>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: sizeWidth(3.2),
  },
  icon: {
    marginRight: sizeWidth(3),
    height: sizeWidth(4),
    width: sizeWidth(4),
  },
});
