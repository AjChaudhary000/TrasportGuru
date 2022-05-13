import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

interface IProps {
  countDownTilForceLogout: number;
  handleInactivity: () => void;
  duration?: number;
  timeout?: ReturnType<typeof setTimeout> | null;
  interval?: ReturnType<typeof setTimeout> | null;
  generateInterval?: () => void;
}

export default class IdleTimeoutView extends Component<IProps> {
  componentWillUnmount() {
    this.handleMaintainActivity();
  }

  render() {
    return (
      <View style={styles.container_overlay}>
        <View style={styles.modal_container}>
          <View style={styles.view_text_container}>
            <View style={styles.view_text}>
              <Text style={styles.header_text}>{'Inactivity'}</Text>
            </View>
            <View style={styles.view_text}>
              <Text style={styles.text}>
                {`You will be logged out in ${
                  this.props.countDownTilForceLogout / 1000
                } seconds for inactivity.`}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.touchable_keep}
              onPress={this.handleMaintainActivity}>
              <Text style={styles.touchable_text}>{'Keep me signed in'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  handleMaintainActivity = () => {
    this.props.handleInactivity();
  };
}
