import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Icons from '../../component/Icon';
import styles from './styles';

interface IProps {
  styleButton?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export default class TriStarLogo extends React.PureComponent<IProps> {
  render() {
    const {styleButton, onPress} = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, styleButton]}
        onPress={onPress}
        disabled={!onPress}>
        <Icons
          style={styles.icon}
          source={require('../../../res/images/ic_starttext.png')}
        />
      </TouchableOpacity>
    );
  }
}
