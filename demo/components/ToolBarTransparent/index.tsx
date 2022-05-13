import React, {Component} from 'react';
import {View} from 'react-native';
import Text from '../Text';
import BackIcon from '../../components/BackIcon';
import styleApp from '../../../res/style/style';
import styles from './styles';
import {IProps} from '../ToolBar/ToolBar_Types';

export default class ToolBarTransparent extends Component<IProps> {
  render() {
    const {left, center, right, left_right, title} = this.props;
    if (title) {
      return (
        <View>
          <View />
          <View style={styles.Default}>
            <Text numberOfLines={1} style={styleApp.ToolBarText}>
              {title}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.Container}>
            <View style={styles.Left}>{left || <BackIcon />}</View>
            <View style={styles.Center}>{center}</View>
            {left_right && this.renderLeftRight(left_right)}
            {this.renderRight(right)}
          </View>
        </View>
      );
    }
  }

  renderLeftRight = (left_right: React.ReactNode) => {
    return <View style={styles.LeftRight}>{left_right}</View>;
  };

  renderRight = (right: React.ReactNode) => {
    return <View style={styles.Right}>{right}</View>;
  };
}
