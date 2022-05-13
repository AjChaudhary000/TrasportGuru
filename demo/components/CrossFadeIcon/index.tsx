/* @flow */

import React, {Component} from 'react';
import {Animated, View} from 'react-native';

import styles from './styles';
import {Props} from './CrossFadeIcon_Types';

export default class TabBarIcon extends Component<Props> {
  render() {
    const {
      route,
      activeOpacity,
      inactiveOpacity,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      horizontal,
      style,
    } = this.props;
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return (
      <View style={style}>
        <Animated.View style={[styles.icon, {opacity: activeOpacity}]}>
          {renderIcon &&
            renderIcon({
              route,
              focused: true,
              horizontal,
              tintColor: activeTintColor,
            })}
        </Animated.View>
        <Animated.View style={[styles.icon, {opacity: inactiveOpacity}]}>
          {renderIcon &&
            renderIcon({
              route,
              focused: false,
              horizontal,
              tintColor: inactiveTintColor,
            })}
        </Animated.View>
      </View>
    );
  }
}
