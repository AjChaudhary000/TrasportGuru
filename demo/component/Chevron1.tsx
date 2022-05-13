import React, {Component} from 'react';

import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {IProps, IState} from '../components/Chevron/Chevron_Types';

export default class Chevron1 extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      date: '',
      value: this.props.lastUpdated,
    };
  }

  componentDidMount() {
    //alert(Dimensions.get('window').height)
    const that = this;
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.lastUpdated) {
      this.setState({value: this.props.lastUpdated});
    }
  }

  render() {
    return (
      <View style={styles.projectRow}>
        <View style={styles.projectText}>
          <Text style={styles.itemName}>{this.props.name}</Text>
          <Text style={styles.itemDetails}>
            {' '}
            TESTING : {this.state.date}
            {/*`${Moment(this.props.lastUpdated).frontNow()}`*/}
          </Text>
        </View>
        <View style={styles.moreContainer}>
          <Icon name="chevron-right" size={15} style={styles.moreIcon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectText: {
    flex: 1,
    flexDirection: 'column',
  },

  projectRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },

  itemName: {
    fontSize: 18,
    color: '#4A90E2',
  },

  itemDetails: {
    fontSize: 12,
    color: '#BBBBBB',
  },

  moreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  moreIcon: {
    color: '#d6d7da',
  },
});
