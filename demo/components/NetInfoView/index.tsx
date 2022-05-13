import React, {Component} from 'react';
import {View, Text, Animated} from 'react-native';
import {inject} from 'mobx-react';
import {sizeHeight, sizeWidth} from '../../util/Size';
import styles from './styles';
import Fontello from '../../component/Fontello';
import NetInfoStore from '../../mobx/NetInfoStore';

interface IProps {
  netInfoStore?: NetInfoStore;
}

interface IState {
  slideIn: Animated.Value;
}

@inject('netInfoStore')
export default class NetInfoView extends Component<IProps, IState> {
  state: IState = {
    slideIn: new Animated.Value(0),
  };
  private timeout: ReturnType<typeof setTimeout> | null = null;

  componentDidMount() {
    const {netInfoStore} = this.props;
    this.slideIn();
    this.timeout = setTimeout(() => {
      netInfoStore?.toggleDisplay(false);
    }, 4500);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  slideIn = () => {
    Animated.timing(this.state.slideIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {netInfoStore} = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.state.slideIn.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    });
    const slide_anim = {
      opacity: this.state.slideIn,
      transform: [
        {
          translateY: this.state.slideIn.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          }),
        },
      ],
    };

    return netInfoStore?.shouldDisplay ? (
      <Animated.View style={[styles.topBarContainer, slide_anim]}>
        <View style={styles.containerInner}>
          <Text style={styles.text_error_blue}>
            {netInfoStore?.connectionString}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'auto',
          }}>
          <Fontello
            size={sizeWidth(3.4)}
            name={'ic_close'}
            onPress={() => this.handleClose()}
            style={{
              color: '#7B7B7B',
              right: sizeWidth(2),
              top: sizeHeight(0.225),
            }}
          />
        </View>
      </Animated.View>
    ) : null;
  }

  handleClose = () => {
    const {netInfoStore} = this.props;
    netInfoStore?.toggleDisplay();
  };
}
