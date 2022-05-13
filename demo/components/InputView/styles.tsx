import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';
import {COLOR_APP_BLACK} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
  },
  textInput: {
    flex: 1,
    fontSize: sizeFont(3.8),
    height: 40,
    color: COLOR_APP_BLACK,
    borderBottomWidth: 1,
  },
  icon: {
    height: sizeWidth(5),
    width: sizeWidth(5),
    marginRight: sizeWidth(5),
  },
});

export default styles;
