import {StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: sizeWidth(3.2),
  },
  icon: {
    marginRight: sizeWidth(3),
    height: sizeWidth(4),
    width: sizeWidth(4),
  },
});

export default styles;
