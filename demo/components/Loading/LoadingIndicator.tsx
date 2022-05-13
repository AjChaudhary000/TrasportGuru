import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import AppText from '../Text';
import moment from 'moment';
import {inject} from 'mobx-react';
import {IProps, IState} from './Loading_Types';

@inject('netInfoStore')
export default class LoadingIndicator extends React.Component<IProps, IState> {
  state: IState = {
    eventDate: moment
      .duration()
      .add({days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0}),
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    millis: 0,
    status: 'pending',
    startTime: new Date().toLocaleTimeString(),
    currentTime: new Date().toLocaleTimeString(),
  };
  private interval: ReturnType<typeof setTimeout> | null = null;

  componentDidMount() {
    this.updateTimer();
  }

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

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }
  render() {
    let {isVisible} = this.props;
    if (isVisible) {
      return (
        <View style={styles.container}>{this.renderTransparentSpinner()}</View>
      );
    } else {
      return null;
    }
  }

  renderTransparentSpinner = () => {
    const {hours, mins, secs, currentTime, startTime, status} = this.state;

    const elapsedHours = (hours || 0) < 10 ? `0${hours || 0}` : hours;
    const elapsedMins = (mins || 0) < 10 ? `0${mins}` : mins;
    const elapsedSecs = (secs || 0) < 10 ? `0${secs}` : secs;

    return (
      <View style={styles.container}>
        <View style={styles.LoadingInnerContainer}>
          <View style={styles.LoadingInnerContainer_Transparent}>
            <View style={styles.view_clock_container}>
              <View style={styles.view_clock}>
                <View style={styles.view_time_row}>
                  <Text style={styles.text_time}>{'Connection Status:'}</Text>
                  <Text style={styles.text_time}>
                    {`${
                      this.props.netInfoStore?.isConnected
                        ? 'Online'
                        : 'Offline'
                    }`}
                  </Text>
                </View>
                <View style={styles.view_time_row}>
                  <Text style={styles.text_time}>{'Start Time:'}</Text>
                  <Text style={styles.text_time}>{`${startTime}`}</Text>
                </View>
                <View style={styles.view_time_row}>
                  <Text style={styles.text_time}>
                    {`${status === 'pending' ? 'Current Time:' : 'End Time:'}`}
                  </Text>
                  <Text style={styles.text_time}>{`${currentTime}`}</Text>
                </View>
                <View style={styles.view_time_row}>
                  <Text style={styles.text_time}>{'Elapsed Time:'}</Text>
                  <Text style={styles.text_time}>
                    {`${elapsedHours}:${elapsedMins}:${elapsedSecs}`}
                  </Text>
                </View>
              </View>
            </View>
            <Image
              style={styles.img}
              resizeMode={'contain'}
              source={require('../../../res/images/tristar_spinner.gif')}
            />
          </View>
          <AppText style={styles.text}>
            {'Gathering your recent chats...'}
          </AppText>
        </View>
      </View>
    );
  };
}

//../../../res/images/tristar_spinner_transparent_small.gif
