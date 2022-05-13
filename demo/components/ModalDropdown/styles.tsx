import {StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';
import {COLOR_PLACEHOLDER} from '../../../res/style/AppStyle';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    flex: 1,
  },
  modal: {
    flexGrow: 1,
  },
  dropdown: {
    position: 'absolute',
    borderWidth: 1,
    marginTop: 5,
    borderColor: COLOR_PLACEHOLDER,
    borderRadius: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: undefined

  },
  loading: {
    alignSelf: 'center',
  },
  list: {
    //flexGrow: 1,
  },
  rowText: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    fontSize: 11,
    color: 'gray',
    backgroundColor: 'white',
    textAlignVertical: 'center',
  },
  highlightedRowText: {
    color: 'black',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightgray',
  },
  image: {
    marginRight: sizeWidth(3),
    width: sizeWidth(5),
    height: sizeWidth(5),
    transform: [
      {
        rotate: '270deg',
      },
    ],
  },
});

export default styles;
