import {StyleSheet} from 'react-native';
import {sizeHeight, sizeWidth} from '../../util/Size';

const styles = StyleSheet.create({
  Loading: {
    position: 'absolute',
    width: sizeWidth(100),
    height: sizeHeight(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    zIndex: 100,
  },
});

export default styles;
