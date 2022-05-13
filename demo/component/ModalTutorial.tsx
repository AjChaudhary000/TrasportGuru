import React, {Component} from 'react';
import {StyleSheet, View, Modal, ScrollView} from 'react-native';
import AppText from './Text';
import {sizeFont, sizeHeight, sizeWidth} from '../util/Size';
import IconText from './IconText';
import WrapText from './WrapText';
import {IProps} from '../components/ModalTutorial/ModalTutorial_Types';

export default class ModalTutorial extends Component<IProps> {
  state = {
    isCheck: false,
  };

  render() {
    const {
      isVisible,
      onPressAgree,
      title,
      textContent,
      note,
      agree,
      content,
      onRequestClose,
    } = this.props;
    const {isCheck} = this.state;

    return (
      <Modal
        visible={isVisible}
        onRequestClose={onRequestClose}
        transparent={true}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View style={styles.container}>
            <AppText style={{marginBottom: sizeWidth(2)}}>{title}</AppText>
            <ScrollView bounces={false} indicatorStyle={'white'}>
              <WrapText
                style={{
                  fontSize: sizeFont(3.47),
                  lineHeight: sizeWidth(8),
                }}
                wrapStyle={{paddingHorizontal: sizeWidth(3)}}>
                {textContent}
              </WrapText>
            </ScrollView>
            <View style={styles.view_check}>
              <AppText>{note}</AppText>
              <IconText
                onPress={() => {
                  this.setState({isCheck: true});
                  onPressAgree();
                }}
                style={styles.agree}
                styleIcon={styles.icon_check}
                styleText={{fontSize: sizeFont(3.47)}}
                icon={
                  isCheck
                    ? require('../../res/images/ic_check_agree.png')
                    : require('../../res/images/ic_uncheck.png')
                }
                text={agree}
              />
              <AppText style={{fontSize: sizeFont(2.93)}}>{content}</AppText>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: sizeHeight(73),
    backgroundColor: '#00004A',
    alignItems: 'center',
    width: sizeWidth(88.8),
    paddingVertical: sizeHeight(3),
    paddingHorizontal: sizeWidth(3),
    borderRadius: sizeWidth(5),
  },
  view_check: {},
  agree: {
    marginVertical: sizeHeight(1),
    justifyContent: 'center',
  },
  icon_check: {
    height: sizeWidth(5),
    width: sizeWidth(5),
  },
});
