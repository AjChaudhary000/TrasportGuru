import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';
import {APP_TEXT_COLOR} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  Text: {
    flexWrap: 'wrap',
    fontSize: sizeFont(3.7),
    color: APP_TEXT_COLOR,
    lineHeight: sizeWidth(5.6),
  },
});

export default styles;
