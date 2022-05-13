/* @flow */

import React, {Component} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import CrossFadeIcon from '../../components/CrossFadeIcon';
import NavigationActions from '../../router/NavigationActions';
import {inject, observer} from 'mobx-react';
import {sizeWidth} from '../../util/Size';
import {strings} from '../../config/i18n/i18n';
import {COLOR_APP_TRISTAR_GREEN} from '../../../res/style/AppStyle';

import styles from './styles';
import {IProps, Props} from './TabBar_Types';
import {IRoute} from '../CrossFadeIcon/CrossFadeIcon_Types';

const majorVersion = parseInt(String(Platform.Version), 10);
const isIos = Platform.OS === 'ios';
const isIOS11 = majorVersion >= 11 && isIos;

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

class TouchableOpacityWrapper extends Component<IProps> {
  render() {
    const {onPress, onLongPress, testID, accessibilityLabel, ...props} =
      this.props;

    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={onPress}
        onLongPress={onLongPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel}>
        <View {...props} />
      </TouchableOpacity>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TouchableOpacityMenuWrapper extends Component<IProps> {
  render() {
    const {onPress, onLongPress, testID, accessibilityLabel, ...props} =
      this.props;

    return (
      <View
        style={{flex: 2, backgroundColor: COLOR_APP_TRISTAR_GREEN}}
        testID={testID}
        accessibilityLabel={accessibilityLabel}>
        <View style={{flex: 1, backgroundColor: COLOR_APP_TRISTAR_GREEN}} />
        <View style={{flex: 1, backgroundColor: '#ADADAF'}} />
        <TouchableOpacity
          style={{
            height: sizeWidth(9),
            position: 'absolute',
            right: sizeWidth(1),
            top: sizeWidth(1),
          }}
          onPress={onPress}
          onLongPress={onLongPress}>
          <View {...props} style={styles.menuButton} />
        </TouchableOpacity>
      </View>
    );
  }
}

@inject('loadingStore')
@inject('userStore')
@observer
export default class TabBarBottom extends Component<Props> {
  static defaultProps = {
    activeTintColor: COLOR_APP_TRISTAR_GREEN,
    activeBackgroundColor: 'transparent',
    inactiveBackgroundColor: 'transparent',
    inactiveTintColor: '#8E8E93',
    showLabel: false,
    showIcon: true,
    allowFontScaling: true,
    adaptive: isIOS11,
    safeAreaInset: {bottom: 'always', top: 'never'},
  };

  _renderLabel = ({route, focused}: {route: IRoute; focused: boolean}) => {
    const {labelStyle, showLabel, showIcon, allowFontScaling} = this.props;

    if (showLabel === false) {
      return null;
    }

    const label = this.props.getLabelText({route});
    const tintColor = 'white';

    if (typeof label === 'string') {
      return (
        <Animated.View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.label,
              {color: tintColor},
              showIcon && this._shouldUseHorizontalLabels()
                ? styles.labelBeside
                : styles.labelBeneath,
              labelStyle,
            ]}
            allowFontScaling={allowFontScaling}>
            {strings(label)}
          </Animated.Text>
        </Animated.View>
      );
    }

    if (typeof label === 'function') {
      return label({route, focused, tintColor});
    }

    return label;
  };

  _renderIcon = ({route, focused}: {route: IRoute; focused: boolean}) => {
    const {
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon,
      showLabel,
    } = this.props;
    if (showIcon === false) {
      return null;
    }

    const horizontal = this._shouldUseHorizontalLabels();

    const activeOpacity = focused ? 1 : 0;
    const inactiveOpacity = focused ? 0 : 1;

    return (
      <CrossFadeIcon
        route={route}
        horizontal={horizontal}
        navigation={navigation}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        style={[
          styles.iconWithExplicitHeight,
          !showLabel && !horizontal && styles.iconWithoutLabel,
          showLabel && !horizontal && styles.iconWithLabel,
        ]}
      />
    );
  };

  _shouldUseHorizontalLabels = () => {
    const {routes} = this.props.navigation.state;
    const {isLandscape, dimensions, adaptive, tabStyle} = this.props;

    if (!adaptive) {
      return false;
    }

    if ('isPad' in Platform && Platform.isPad) {
      let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

      const flattenedStyle = StyleSheet.flatten(tabStyle);

      if (flattenedStyle) {
        if (typeof flattenedStyle.width === 'number') {
          maxTabItemWidth = flattenedStyle.width;
        } else if (typeof flattenedStyle.maxWidth === 'number') {
          maxTabItemWidth = flattenedStyle.maxWidth;
        }
      }

      return routes.length * maxTabItemWidth <= dimensions.width;
    } else {
      return isLandscape;
    }
  };

  render() {
    const {
      navigation,
      activeBackgroundColor,
      inactiveBackgroundColor,
      onTabPress,
      safeAreaInset,
      style,
      tabStyle,
    } = this.props;

    const {routes} = navigation.state;

    const tabBarStyle = [
      styles.tabBar,
      this._shouldUseHorizontalLabels() &&
      'isPad' in Platform &&
      !Platform.isPad
        ? styles.tabBarCompact
        : styles.tabBarRegular,
      style,
    ];

    return (
      <SafeAreaView style={tabBarStyle} forceInset={safeAreaInset}>
        {routes.map(
          (route: {key: string | undefined}, index: string | number) => {
            const focused = index === navigation.state.index;
            const scene = {route, focused};
            const accessibilityLabel = this.props.getAccessibilityLabel({
              route,
            });
            const testID = this.props.getTestID({route});

            const backgroundColor = focused
              ? activeBackgroundColor
              : inactiveBackgroundColor;

            const ButtonComponent = TouchableOpacityWrapper;

            return (
              <ButtonComponent
                key={route.key}
                onPress={() =>
                  this.onTabPressCustom(onTabPress, index, {route})
                }
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                style={[
                  styles.tab,
                  {backgroundColor},
                  styles.tabLandscape,
                  tabStyle,
                ]}>
                {this._renderIcon(scene)}
                {this._renderLabel(scene)}
              </ButtonComponent>
            );
          },
        )}
      </SafeAreaView>
    );
  }

  onTabPressCustom = (
    onTabPress: (arg0: {route: IRoute}) => void,
    index: number | string,
    route: {route: IRoute},
  ) => {
    if (route.route.routeName === 'Menu') {
      NavigationActions.toggleDrawer();
    } else {
      onTabPress(route);
    }
  };
}
