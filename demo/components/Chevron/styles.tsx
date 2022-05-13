import {StyleSheet} from 'react-native';

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

export default styles;
