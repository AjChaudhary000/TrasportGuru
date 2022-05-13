import {Platform, StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';

const platform = Platform.OS === 'ios' ? sizeWidth(4) : sizeWidth(-3);

const styles = StyleSheet.create({
  container: {
    marginVertical: sizeWidth(2),
  },
  drop: {
    padding: sizeWidth(0),
    alignItems: 'center',
    marginTop: sizeWidth(2),
  },
  image: {
    marginRight: sizeWidth(3),
  },
  dropdown: {
    padding: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: sizeWidth(10),
  },
  text: {
    fontSize: sizeWidth(3.73),
    margin: 0,
    paddingHorizontal: sizeWidth(2),
    textAlignVertical: 'center',
  },
  dropdown_select: {
    marginTop: platform,
  },
  dropdown_select_Height: {
    marginTop: platform,
    height: sizeWidth(10) * 5,
  },
  texdf: {
    fontSize: sizeWidth(3.73),
  },
});

export default styles;
