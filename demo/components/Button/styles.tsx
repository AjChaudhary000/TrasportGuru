import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';
import {COLOR_APP_BLACK} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizeWidth(5),
    paddingVertical: sizeWidth(3.5),
    backgroundColor: COLOR_APP_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: sizeWidth(2),
    elevation: 1,
    shadowOffset: {width: 0, height: sizeWidth(0.1)},
    shadowOpacity: 0.1,
  },
  TextInside: {
    textAlign: 'center',
    flex: 1,
    fontSize: sizeFont(4),
  },
});

export default styles;
