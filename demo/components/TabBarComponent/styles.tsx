import {Platform, StyleSheet} from 'react-native';
import {sizeWidth} from '../../util/Size';

export const DEFAULT_HEIGHT = sizeWidth(8);
const COMPACT_HEIGHT = 29;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tabBarCompact: {
    height: COMPACT_HEIGHT,
  },
  tabBarRegular: {
    height: DEFAULT_HEIGHT,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabPortrait: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  tabLandscape: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconWithoutLabel: {
    flex: 1,
  },
  iconWithLabel: {
    flex: 1,
  },
  iconWithExplicitHeight: {
    height:
      'isPad' in Platform && Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT,
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  labelBeneath: {
    fontSize: 11,
    marginBottom: 1.5,
  },
  labelBeside: {
    fontSize: 12,
    marginLeft: 15,
  },
  menuButton: {
    height: sizeWidth(9),
    justifyContent: 'center',
    paddingHorizontal: sizeWidth(4),
    borderWidth: sizeWidth(1),
    borderColor: 'white',
  },
  numberContainer: {
    height: sizeWidth(5),
    width: sizeWidth(5),
    borderRadius: sizeWidth(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: sizeWidth(1),
    marginTop: sizeWidth(-3),
    backgroundColor: '#DE4830',
  },
});

export default styles;
