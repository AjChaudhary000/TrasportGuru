import React, {Component} from 'react';

import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {IProps, IState} from './Chevron_Types';

export default class Chevron extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      date: '',
      value: this.props.lastUpdated,
    };
  }

  componentDidMount() {
    //alert(Dimensions.get('window').height)
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.lastUpdated !== this.props.lastUpdated) {
      this.setState({value: this.props.lastUpdated});
    }
  }

  render() {
    return (
      <View style={styles.projectRow}>
        <View style={styles.projectText}>
          <Text style={styles.itemName}>{this.props.name}</Text>
          <Text style={styles.itemDetails}> TESTING : {this.state.date}</Text>
        </View>
        <View style={styles.moreContainer}>
          <Icon name="chevron-right" size={15} style={styles.moreIcon} />
        </View>
      </View>
    );
  }
}
