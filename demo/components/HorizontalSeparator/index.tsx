import React from 'react';
import {View} from 'react-native';

import styles from './styles';

export default class HorizontalSeparator extends React.PureComponent {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return <View style={styles.separator} />;
  }
}
