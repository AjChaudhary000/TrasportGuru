import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image as RNImage,
  ImageSourcePropType,
} from 'react-native';
import {strings} from '../../config/i18n/i18n';
import moment from 'moment';
import {isSameDay} from '../../util/miscellaneous';
import {sizeFont} from '../../util/Size';
import {TIME_FORMAT, MIMIC_IPHONE} from '../../constants/Date';
import {Fonts} from '../../../res/themes';
import {COLOR_APP_WHITE, COLOR_APP_BLACK} from '../../../res/style/AppStyle';
import {getSignedUrl} from '../../util/AWSUtils';
import * as messageActions from '../../realm/controllers/chat/messagesActions';
import {inject, observer} from 'mobx-react';
import RealmStore from '../../mobx/RealmStore';
import ImageViewerStore from '../../mobx/ImageViewerStore';
import {IAttachment, ILatestMessages} from '../../mobx/UserStore_Types';
import IDbOptions from '../../mobx/Types';
import Realm from 'realm';
import {IAttachmentData} from '../../screen/auth/loading/AuthLoading_Types';

interface IProps {
  message?: ILatestMessages;
  realmStore?: RealmStore;
  imageViewerStore?: ImageViewerStore;
  isOwner?: boolean;
  ownerID?: number | null;
  isLastMessage?: boolean;
  previousMessage?: IAttachment | ILatestMessages;
}

interface IPhoto {
  photo?: IAttachmentData | IAttachment | null;
}

@inject('realmStore')
@inject('imageViewerStore')
@observer
export default class MessageItem extends React.Component<IProps> {
  state = {
    validURL: null,
    imgBase64: null,
    photoRaw: null,
    id: null,
    isLastReadMessage: false,
    deliveryStatus: null,
    readStatus: null,
    isLastMessage: false,
  };

  async UNSAFE_componentWillMount() {
    await this.loadRealmMessageData();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {
      return;
    };
  }

  async componentDidUpdate(prevProps: IProps) {
    if (prevProps !== this.props) {
      await this.loadRealmMessageData();
    }
  }

  loadRealmMessageData = async () => {
    const {message, realmStore} = this.props;

    let photo = message?.attachment || message?.PhotosAttachmentMessage;
    if (message?.dialog_id) {
      await messageActions
        .getMessageByQuery(
          `dialog_id = "${message.dialog_id}" AND Unread = false`,
          realmStore?.dbOptions as IDbOptions,
        ) // *NOTE: realm queries are cached
        .then(messages => {
          if (messages && (messages as ILatestMessages[]).length > 0) {
            const lastMessage = (
              messages as Realm.Results<ILatestMessages & Realm.Object>
            ).sorted('id', true)[0];
            if (message.id) {
              this.setState({
                isLastReadMessage: lastMessage.id === message.id,
              });
            }
            return;
          }
        });
    }
    if (!message?.id) {
      if (message?.photoRaw) {
        // a message uploaded yielding a .photoRaw field
        this.setState({
          photoRaw: message.photoRaw.URL,
          id: message.id,
          isLastMessage: true,
          deliveryStatus: true,
        });
      } else if (message?.Text) {
        this.setState({isLastMessage: true, deliveryStatus: true});
      }
    } else if (photo) {
      await messageActions
        .getMessage(message.id, realmStore?.dbOptions as IDbOptions)
        .then(msg => {
          if (msg && msg.length > 0) {
            if (msg[0].attachment && msg[0].attachment.Base64 !== null) {
              this.setState(
                {
                  id: msg[0].id,
                  imgBase64: msg[0].attachment.Base64,
                  deliveryStatus: msg[0].Sent,
                  readStatus: msg[0].Unread,
                },
                () => {},
              );
            }
          }
        });
    }
  };
  renderSendingIndicator(sending?: boolean) {
    if (sending) {
      return (
        <View style={styles.sendingIndicator}>
          <ActivityIndicator color="grey" />
        </View>
      );
    }

    return null;
  }

  renderDate(message?: ILatestMessages, previousMessage?: IAttachment) {
    let messageDate: Date | string | undefined | null = null;
    let previousMessageDate: Date | undefined | string | null = messageDate;

    if (previousMessage) {
      previousMessageDate = previousMessage.date
        ? previousMessage.date
        : previousMessage.Created;
    }
    if (message) {
      messageDate = message.date ? message.date : message.Created;
    }

    if (!previousMessage || !isSameDay(messageDate, previousMessageDate)) {
      return (
        <Text style={styles.date}>
          {moment(messageDate).format(MIMIC_IPHONE)}
        </Text>
      );
    }

    return null;
  }

  identifyPhotoContents = (photo?: IPhoto, type?: string) => {
    if (type === 'https') {
      console.log('URL:', photo?.photo?.URL);
    }
  };

  renderPhoto(photo?: IPhoto | IAttachment) {
    if (photo?.photo) {
      const base = photo?.photo?.Base64;
      const {imgBase64, photoRaw} = this.state;
      if (base || imgBase64 || photoRaw) {
        let photoContent = base || imgBase64 || photoRaw;
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.identifyPhotoContents(photo, 'localized');
              if (base || imgBase64 || photoRaw) {
                this.props.imageViewerStore?.setImageView({
                  uri: photoContent || '',
                  height: 300,
                  width: 300,
                });
              }
            }}>
            <View style={styles.messagePhotoWrapper}>
              <RNImage
                source={
                  photoRaw
                    ? {uri: photoRaw}
                    : ({
                        uri:
                          base &&
                          imgBase64 &&
                          `data:image/png;base64,${base || imgBase64}`,
                      } as ImageSourcePropType)
                }
                style={{
                  ...styles.messagePhotoSize,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      }

      let url = (photo?.photo as IAttachmentData)?.photo?.URL;
      if (
        photo?.photo &&
        (photo.photo as IAttachmentData)?.photo &&
        (photo.photo as IAttachmentData).photo?.photoUrl
      ) {
        url = (photo.photo as IAttachmentData)?.photo?.photoUrl;
      }

      if (!url) {
        url = (photo?.photo as IAttachmentData)?.photo?.URL;
      }

      const {isOwner} = this.props;
      const imageStyle = [
        styles.messagePhotoSize,
        isOwner ? styles.messageOwnerGradient : styles.messagePhotoRadius,
      ];

      url &&
        getSignedUrl(url, (err, signedURL) => {
          if (err) {
            return;
          }
          if (signedURL && !this.state.validURL) {
            this.setState({validURL: signedURL});
          }
        });

      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.state.validURL !== null) {
              this.props.imageViewerStore?.setImageView({
                uri: this.state.validURL as string,
                height: 300,
                width: 300,
              });
            }
          }}>
          {this.state.validURL ? (
            <View style={styles.messagePhotoWrapper}>
              <RNImage
                defaultSource={require('../../../res/assets/loading-image.png')}
                source={{uri: this.state.validURL}}
                style={imageStyle}
              />
            </View>
          ) : (
            <View />
          )}
        </TouchableWithoutFeedback>
      );
    }
  }

  renderContent = () => {
    const {message, isOwner} = this.props;
    let image = null;
    if (message) {
      if (
        message?.PhotosAttachmentMessage &&
        message.PhotosAttachmentMessage.MessageAttachmentsPhoto
      ) {
        image = message.PhotosAttachmentMessage.MessageAttachmentsPhoto[0];
      }
    }
    if (message?.Text === 'TextMessageWithPhotoAttachment') {
      if (image) {
        if (!(image as IAttachment).photo) {
          image = {photo: image};
        }
        if (!(image as IAttachment)?.photo?.Base64) {
          image = {photo: image};
        }
        return this.renderPhoto(image);
      }
      image = message.attachment as IAttachment;
      if (!image?.photo) {
        image = {photo: image};
      }
      if (!image?.photo?.Base64) {
        image = {photo: image};
      }
      return this.renderPhoto(image);
    } else {
      return (
        <>
          <Text
            style={[styles.messageText, isOwner && styles.messageTextOwner]}>
            {message?.Text}
          </Text>
          <Text style={[styles.time, !isOwner && styles.timeRecipient]}>
            {message?.date
              ? moment(message.date).format(TIME_FORMAT)
              : moment(message?.Created).format(TIME_FORMAT)}
          </Text>
        </>
      );
    }
  };

  renderReadOrDelivered = () => {
    const {message, ownerID, isLastMessage} = this.props;
    const {isLastReadMessage} = this.state;
    const isReed =
      (message?.Unread === 0 || message?.Unread === false) &&
      ownerID === message.SenderId;
    const isUnsent = message?.Sent === false;

    if (isLastReadMessage && isReed) {
      return <Text style={styles.reedStatusText}>{strings('chat.read')}</Text>;
    }
    if (isLastMessage && !isReed) {
      return (
        <Text style={styles.sentStatusText}>
          {!isUnsent ? 'Sent' : 'Pending'}
        </Text>
      );
    }
  };

  render() {
    const {message, previousMessage, isOwner} = this.props;

    return (
      <>
        {!isOwner ? (
          <View style={[styles.messageWrapper, {alignSelf: 'flex-end'}]}>
            <View style={styles.messageOwner}>{this.renderContent()}</View>
            {this.renderSendingIndicator(message?.sending)}
            {this.renderReadOrDelivered()}
          </View>
        ) : (
          <View style={[styles.messageWrapper, styles.messageFrom]}>
            {this.renderContent()}
          </View>
        )}
        {this.renderDate(message, previousMessage)}
      </>
    );
  }
}

const styles = StyleSheet.create({
  messageWrapper: {
    borderRadius: 3,
    margin: 17,
    marginVertical: 7,
  },
  messageFrom: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: 'rgb(46, 61, 73)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 1,
  },
  messageText: {
    padding: 13,
    fontSize: sizeFont(3.5819),
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    lineHeight: 19,
    maxWidth: '85%',
    color: COLOR_APP_WHITE,
  },
  messageTextOwner: {
    color: COLOR_APP_BLACK,
  },
  messageOwnerGradient: {
    borderRadius: 3,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
  },
  messageTextRecipient: {
    color: '#fff',
    alignSelf: 'flex-end',
  },
  messageOwner: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#17A2B8',
    borderRadius: 3,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    paddingBottom: 10,
    fontSize: 12,
    paddingRight: 10,
  },
  timeRecipient: {
    color: '#fff',
  },
  timeInPhotoWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 10,
  },
  timeInPhotoText: {
    color: '#fff',
    fontSize: 11,
  },
  sendingIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    marginTop: 10,
    left: -30,
    bottom: 5,
    zIndex: 1,
  },
  sentStatusText: {
    alignSelf: 'flex-end',
    color: 'grey',
    marginTop: 3,
    fontSize: 12,
  },
  reedStatusText: {
    alignSelf: 'flex-end',
    color: 'grey',
    marginTop: 3,
    fontSize: 12,
  },
  date: {
    color: '#b2b2b2',
    textAlign: 'center',
    marginVertical: 5,
  },
  messagePhotoWrapper: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagePhotoRadius: {
    borderRadius: 10,
  },
  messagePhotoSize: {
    width: 230,
    height: 200,
  },
});
