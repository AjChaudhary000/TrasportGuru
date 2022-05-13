import {StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';
import {APP_BACKGROUND} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  imageLoading: {
    height: sizeWidth(35),
    width: sizeWidth(35),
    borderRadius: sizeWidth(100),
    backgroundColor: APP_BACKGROUND,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
