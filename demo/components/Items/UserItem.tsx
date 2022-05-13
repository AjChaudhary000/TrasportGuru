import React from 'react';
import {Fonts} from '../../../res/themes';
import {Text, View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import UserPicture from '../../screen/chat/components/UserPicture';
import {sizeHeight, sizeFont} from '../../util/Size';
import {IMember} from '../../mobx/UserStore_Types';

interface IProps {
  user: IMember;
  onPress?: () => void;
  pictureSize?: number;
  style?: StyleProp<ViewStyle>;
  conversation?: boolean;
}

export default class CompanyCard extends React.PureComponent<IProps> {
  render() {
    let {user, onPress, pictureSize, style, conversation} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.wrapper, style]}>
          <UserPicture
            user={user}
            // hideBorder
            size={pictureSize || 50}
            // picture={user.picture}
            chooseOverlay={null}
            onPress={() => {}}
            isLoading={null}
          />
          <View
            style={[styles.info, conversation ? styles.info_conversation : {}]}>
            <Text
              style={[
                styles.name,
                conversation ? styles.name_conversation : {},
              ]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.url} ellipsizeMode="tail" numberOfLines={1}>
              {!conversation ? user?.username?.toString() : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  info: {
    paddingLeft: 23.5,
  },
  info_conversation: {
    paddingLeft: 18.5,
  },
  name: {
    fontFamily: Fonts.type.OpenSansDisplayBold,
    fontSize: sizeFont(3.7),
    color: '#666666',
    letterSpacing: 0.1,
    marginBottom: sizeHeight(0.3),
  },
  name_conversation: {
    letterSpacing: 0.1,
    marginTop: sizeHeight(2),
    marginLeft: -7,
    fontSize: sizeFont(3.5),
    fontFamily: Fonts.type.OpenSansDisplayRegular,
  },
  url: {
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    color: '#666666',
    fontSize: 14,
  },
});
