import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, Animated} from 'react-native';
import {sizeHeight, sizeWidth, sizeFont} from '../util/Size';
import {observer, inject} from 'mobx-react';
import {Metrics, Fonts} from '../../res/themes';
import {isIPhoneX} from '../util/Device';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import NavigationActions from '../router/NavigationActions';
import NetInfo from '@react-native-community/netinfo';
import {IProps, IState} from '../components/LoadingView/LoadingView_Types';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

@inject('userStore')
@inject('loadingStore')
@observer
export default class LoadingView extends Component<IProps, IState> {
  private readonly mobxShouldComponentUpdate?: (
    nextProps: Readonly<{}>,
    nextState: Readonly<{}>,
    nextContext: any,
  ) => boolean;
  private interval: ReturnType<typeof setTimeout> | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private naviTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(props: IProps) {
    super(props);
    this.mobxShouldComponentUpdate = this.shouldComponentUpdate;
    this.shouldComponentUpdate = this.customShouldComponentUpdate;
  }

  state: IState = {
    eventDate: moment
      .duration()
      .add({days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}),
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    millis: 0,
    startTime: new Date().toLocaleTimeString(),
    currentTime: new Date().toLocaleTimeString(),
    fadeIn: new Animated.Value(0),
    timerDidFinish: false,
    secondsToReRouteToLogin: 20, // max 60
    forceLogoutDidStart: false,
    status: 'pending',
    // device info
    deviceName: DeviceInfo.getDeviceName(),
    device: DeviceInfo.getModel(),
    sysVersion: DeviceInfo.getSystemVersion(),
    totalDiskCapacity: 0,
    freeDiskStorage: 0,
    usedStorage: 0,
    // net info
    connectionStatus: 'Offline',
    showLogin: false,
    isHidden: false,
  };

  async componentDidMount() {
    if (this.props.loadingStore) {
      const {showClock, easeIn} = this.props.loadingStore;
      if (typeof showClock === 'object' && Object.keys(showClock).length > 0) {
        this.updateTimer();
      }
      if (easeIn) {
        this.fadeIn();
      }
      const capacity = DeviceInfo.getTotalDiskCapacity();
      this.setState({
        totalDiskCapacity: (Number(capacity) / 1073741824).toFixed(2),
      });
      const freeDiskStorage = DeviceInfo.getFreeDiskStorage();
      this.setState({
        freeDiskStorage: (Number(freeDiskStorage) / 1073741824).toFixed(2),
      });
      const usedStorage = (
        (Number(capacity) - Number(freeDiskStorage)) /
        1073741824
      ).toFixed(2);
      this.setState({usedStorage});

      NetInfo.fetch().then(state => {
        const connectionStatus = state.isConnected ? 'Online' : 'Offline';
        this.setState({connectionStatus});
      });
    }
  }

  customShouldComponentUpdate(props: IProps, ...args: []) {
    if (this.props.loadingStore) {
      const {status} = this.props.loadingStore;
      const {secs, secondsToReRouteToLogin} = this.state;
      if (
        status === 'error' ||
        (status === 'pending' &&
          secs &&
          secondsToReRouteToLogin &&
          secs >= secondsToReRouteToLogin)
      ) {
        this.setState((state: IState) => {
          if (state.showLogin) {
            return null;
          }
          return {showLogin: true};
        });
      }
      this.setState(state => {
        if (state.status === status) {
          return null;
        }
        if (status === 'error') {
          if (state.forceLogoutDidStart) {
            return null;
          }
          this.interval && clearInterval(this.interval);
          this.timeout = setTimeout(() => {
            NavigationActions.replace('Login', {
              errCode: 'LoadingErrorException',
              errMessage: 'There was a network issue. Please try again.',
            });
          }, 90000);
          return {forceLogoutDidStart: true};
        }
        if (status === 'complete') {
          this.interval && clearInterval(this.interval);
          this.timeout && clearTimeout(this.timeout);
          this.naviTimeout = setTimeout(() => {
            NavigationActions.replace('Home');
          }, 1000);
        }
        return {status};
      });
      // return true;
      // @ts-ignore
      return this.mobxShouldComponentUpdate(props, ...args);
    } else {
      return false;
    }
  }

  componentWillUnmount() {
    const {loadingStore} = this.props;
    this.interval && clearInterval(this.interval);
    this.timeout && clearTimeout(this.timeout);
    this.naviTimeout && clearTimeout(this.naviTimeout);
    loadingStore?.reset();
  }

  fadeIn = () => {
    this.state.fadeIn &&
      Animated.timing(this.state.fadeIn, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    this.setState({isHidden: true});
  };

  updateTimer = () => {
    this.interval = setInterval(() => {
      let {eventDate} = this.state;
      if (Number(eventDate) <= 0) {
        this.interval && clearInterval(this.interval);
      } else {
        eventDate = eventDate?.add(1, 'second');
        const days = eventDate?.days();
        const hours = eventDate?.hours();
        const mins = eventDate?.minutes();
        const secs = eventDate?.seconds();
        const millis = eventDate?.milliseconds();
        const currentTime = new Date().toLocaleTimeString();
        this.setState({
          days,
          hours,
          mins,
          secs,
          millis,
          eventDate,
          currentTime,
        });
      }
    }, 1000);
  };

  render() {
    if (this.props.loadingStore?.loading) {
      const {hours, mins, secs, currentTime, startTime, connectionStatus} =
        this.state;
      const {loadingText, transparent, showClock, easeIn, status} =
        this.props.loadingStore;
      const text =
        loadingText && loadingText.length > 0 ? `${loadingText}` : '';
      let anim = this.state.fadeIn?.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      });

      const custom_anim = this.state.fadeIn
        ? {
            opacity: this.state.fadeIn,
            transform: [{scale: anim as AnimatedInterpolation}],
          }
        : {};

      const elapsedHours = (hours || 0) < 10 ? `0${hours || 0}` : hours;
      const elapsedMins = (mins || 0) < 10 ? `0${mins}` : mins;
      const elapsedSecs = (secs || 0) < 10 ? `0${secs}` : secs;

      return !transparent ? (
        <View style={styles.Loading}>
          {/* <ActivityIndicator animating={true} size={size} color={LOADING_COLOR}/> */}
          <Animated.View
            style={[styles.LoadingInnerContainer, easeIn ? custom_anim : {}]}>
            <Image
              style={styles.img}
              resizeMode={'contain'}
              source={require('../../res/images/tristar_spinner.gif')}
            />
            <View style={styles.text_container}>
              <View style={styles.text_container_inner}>
                <View style={styles.view_loadingText}>
                  <Text style={styles.text_main}>
                    {typeof showClock === 'object' &&
                    Object.keys(showClock).length > 0 &&
                    status !== 'pending'
                      ? status === 'complete'
                        ? text
                        : 'There was an issue gathering your data.'
                      : text}
                  </Text>
                </View>
                <View style={styles.view_clock_container}>
                  {typeof showClock === 'object' &&
                    Object.keys(showClock).length > 0 && (
                      <View style={styles.view_clock}>
                        <View style={styles.view_time_row}>
                          <Text style={styles.text}>
                            {'Connection Status:'}
                          </Text>
                          <Text style={styles.text}>
                            {`${connectionStatus}`}
                          </Text>
                        </View>
                        <View style={styles.view_time_row}>
                          <Text style={styles.text}>{'Start Time:'}</Text>
                          <Text style={styles.text}>{`${startTime}`}</Text>
                        </View>
                        <View style={styles.view_time_row}>
                          <Text style={styles.text}>
                            {`${
                              status === 'pending'
                                ? 'Current Time:'
                                : 'End Time:'
                            }`}
                          </Text>
                          <Text style={styles.text}>{`${currentTime}`}</Text>
                        </View>
                        <View style={styles.view_time_row}>
                          <Text style={styles.text}>{'Elapsed Time:'}</Text>
                          <Text style={styles.text}>
                            {`${elapsedHours}:${elapsedMins}:${elapsedSecs}`}
                          </Text>
                        </View>
                      </View>
                    )}
                </View>
                {/* Clock Footer Buttons */}
              </View>
            </View>
          </Animated.View>
        </View>
      ) : (
        <View style={styles.Loading_Transparent}>
          <View style={styles.LoadingInnerContainer_Transparent}>
            <Image
              style={styles.img_transparent}
              resizeMode={'contain'}
              source={require('../../res/images/tristar_spinner_transparent_small.gif')}
            />
          </View>
        </View>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  Loading: {
    position: 'absolute',
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    zIndex: 9999,
  },
  view_footer: {
    width: '85%',
    marginVertical: sizeHeight(8),
    position: 'absolute',
    alignSelf: 'center',
    minHeight: sizeHeight(3),
  },
  LoadingInnerContainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingBottom: sizeHeight(10),
    alignItems: 'center',
  },
  Loading_Transparent: {
    position: 'absolute',
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  LoadingInnerContainer_Transparent: {
    width: Metrics.WIDTH * 0.64,
    height: Metrics.HEIGHT * 0.16,
    backgroundColor: 'rgba(0,0,0,0.57)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 320,
    alignSelf: 'center',
  },
  img_transparent: {
    width: 150,
    alignSelf: 'center',
  },
  text_container: {
    width: '100%',
    alignSelf: 'center',
  },
  text_container_inner: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: sizeWidth(8),
    width: '100%',
  },
  view_loadingText: {
    flex: 1,
  },
  view_clock_container: {
    width: '100%',
    position: 'absolute',
    bottom: isIPhoneX() ? sizeHeight(52) : sizeHeight(47),
  },
  view_clock: {
    marginTop: sizeHeight(5),
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  view_time_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.type.MinionPro,
    fontSize: sizeFont(4.4),
    letterSpacing: 0.77,
    textAlign: 'center',
  },
  text_main: {
    fontFamily: Fonts.type.MinionPro,
    fontSize: sizeFont(6.4),
    letterSpacing: 0.77,
    textAlign: 'center',
  },
  text_dots: {
    fontFamily: Fonts.type.MinionPro,
    fontSize: sizeFont(5.7),
    letterSpacing: 0.77,
    textAlign: 'left',
  },
});
