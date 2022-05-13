import React from 'react';
import {TouchableOpacity} from 'react-native';
import {sizeWidth} from '../../util/Size';
import Fontello from '../Fontello';
import {IProps} from './IconButton_Types';

import styles from './styles';

export default class IconButton extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  renderIcon = () => {
    const {color, icon, size} = this.props;
    if (icon) {
      return <Fontello size={size || sizeWidth(6)} color={color} name={icon} />;
    }
  };

  render() {
    const {style, onPress, disabled} = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}>
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}
