import {StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: sizeWidth(5.9),
    marginHorizontal: sizeWidth(4.3),
    borderRadius: sizeWidth(1),
    borderColor: '#8190A5',
    borderWidth: sizeWidth(0.2),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: sizeWidth(8),
  },
  textTab: {},
  textTabSelect: {
    color: 'white',
  },
  textTabUnSelect: {
    color: '#8190A5',
  },
  tabSelect: {
    borderBottomLeftRadius: sizeWidth(1),
    borderTopLeftRadius: sizeWidth(1),
    borderBottomRightRadius: sizeWidth(0),
    borderTopRightRadius: sizeWidth(0),
    backgroundColor: '#8190A5',
  },
  tabUnSelect: {
    borderBottomRightRadius: sizeWidth(1),
    borderTopRightRadius: sizeWidth(1),
    borderBottomLeftRadius: sizeWidth(0),
    borderTopLeftRadius: sizeWidth(0),
  },
});

export default styles;
