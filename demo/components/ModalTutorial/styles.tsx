import {StyleSheet} from 'react-native';
import {sizeWidth, sizeHeight} from '../../util/Size';

const styles = StyleSheet.create({
  container: {
    height: sizeHeight(73),
    backgroundColor: '#00004A',
    alignItems: 'center',
    width: sizeWidth(88.8),
    paddingVertical: sizeHeight(3),
    paddingHorizontal: sizeWidth(3),
    borderRadius: sizeWidth(5),
  },
  view_check: {},
  agree: {
    marginVertical: sizeHeight(1),
    justifyContent: 'center',
  },
  icon_check: {
    height: sizeWidth(5),
    width: sizeWidth(5),
  },
});

export default styles;
