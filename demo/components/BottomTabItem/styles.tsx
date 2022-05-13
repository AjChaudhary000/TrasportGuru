import {StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';

const styles = StyleSheet.create({
  Icon: {
    width: sizeWidth(5.3),
    height: sizeWidth(5.3),
  },
  IconActive: {
    width: sizeWidth(5.3),
    height: sizeWidth(5.3),
    tintColor: 'white',
  },
  CameraActive: {
    width: sizeWidth(15),
    height: sizeWidth(15),
    marginTop: sizeWidth(-1),
  },
  numberContainer: {
    height: sizeWidth(4.4),
    width: sizeWidth(4.4),
    borderRadius: sizeWidth(2.2),
    alignItems: 'center',
    position: 'absolute',
    top: sizeWidth(-2),
    right: sizeWidth(-2),
    backgroundColor: '#F6353E',
    borderColor: '#014009',
    borderWidth: 1,
  },
});

export default styles;
