import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

interface IProps {
  onPress: () => void;
  title: string;
  renderRightIcon: () => React.ReactNode;
  renderLeftIcon: () => React.ReactNode;
}

export default class ListItem extends React.Component<IProps> {
  render() {
    const {onPress, title, renderRightIcon, renderLeftIcon} = this.props;

    return (
      <TouchableHighlight
        onPress={onPress}
        underlayColor={'#f3f3f3'}
        style={[styles.item]}>
        <View style={styles.container}>
          {renderLeftIcon && (
            <View style={styles.leftIconWrapper}>{renderLeftIcon()}</View>
          )}
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>{title}</Text>
            <View style={styles.rightIconWrapper}>
              {renderRightIcon ? renderRightIcon() : {}}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconStyle: {
    marginTop: 2,
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    paddingVertical: 5,
    color: '#595959',
    fontSize: 16,
    fontWeight: '500',
  },
  leftIconWrapper: {
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  rightIconWrapper: {
    alignSelf: 'flex-end',
  },
});
