import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TOOLBAR_COLOR} from '../../res/style/AppStyle';
import {sizeHeight, sizeWidth} from '../util/Size';
import Text from './Text';
import BackIcon from './BackIcon';
import styleApp from '../../res/style/style';
import {IProps} from '../components/ToolBar/ToolBar_Types';

export default class ToolBar extends Component<IProps> {
  render() {
    const {left, center, right, left_right, title, style} = this.props;
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
          <View style={style ? [styles.Container, style] : styles.Container}>
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

const styles = StyleSheet.create({
  Container: {
    height: sizeHeight(6.9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: TOOLBAR_COLOR,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  Default: {
    height: sizeHeight(6.9),
    flexDirection: 'row',
    backgroundColor: TOOLBAR_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
  Left: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Right: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LeftRight: {
    position: 'absolute',
    right: 40,
  },
  Center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
