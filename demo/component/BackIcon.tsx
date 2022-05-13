import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {sizeWidth} from '../util/Size';
import NavigationActions from '../router/NavigationActions';
import {COLOR_APP_BLACK} from '../../res/style/AppStyle';
import Fontello from './Fontello';
import AppText from './Text';
import {IProps} from '../components/BackIcon/BackIcon_Types';

export default class BackIcon extends Component<IProps> {
  render() {
    const {style, text} = this.props;
    return (
      <TouchableOpacity
        style={[styles.Container, style]}
        onPress={this.onPress}
        hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
        <Fontello name={'ic_back'} />
        {text && <AppText style={{color: COLOR_APP_BLACK}}>{text}</AppText>}
      </TouchableOpacity>
    );
  }

  onPress = () => {
    const {onPress} = this.props;
    if (onPress) {
      onPress();
    } else {
      NavigationActions.goBack();
    }
  };
}

const styles = StyleSheet.create({
  Container: {
    padding: sizeWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
