import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';
import {COLOR_APP_BLACK} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEDED',
    flexDirection: 'row',
    height: sizeWidth(12),
    borderRadius: sizeWidth(1),
    alignItems: 'center',
    padding: sizeWidth(3),
  },
  textInput: {
    padding: 0,
    fontSize: sizeFont(3.8),
    marginLeft: sizeWidth(3),
    color: COLOR_APP_BLACK,
  },
});

export default styles;
