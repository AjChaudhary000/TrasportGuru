import {StyleSheet} from 'react-native';
import {sizeFont, sizeWidth} from '../../util/Size';

const styles = StyleSheet.create({
  container: {
    marginBottom: sizeWidth(0),
  },
  inputWrap: {
    flexDirection: 'row',
    height: sizeWidth(13),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizeWidth(2.13),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#EDEDED',
  },
  input: {
    fontSize: sizeWidth(3.7),
    textAlign: 'left',
    textAlignVertical: 'center',
    height: sizeWidth(4.06),
    padding: 0,
  },
  emptyInput: {
    flex: 1,
    padding: 0,
    height: sizeWidth(13),
    textAlignVertical: 'center',
    fontSize: sizeWidth(4),
    textAlign: 'left',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: sizeWidth(2.13),
  },
  label: {
    color: '#7B7B7B',
    fontSize: sizeFont(3.7),
    marginBottom: sizeWidth(1),
  },
});

export default styles;
