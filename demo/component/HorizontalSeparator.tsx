import React from 'react';
import {StyleSheet, View} from 'react-native';

export default class HorizontalSeparator extends React.PureComponent {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return <View style={styles.separator} />;
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    opacity: 0.19,
  },
});
