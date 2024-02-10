import React, { useEffect } from 'react';
import styles from './ChatBlockB2b.module.scss'
import close from '../../../assets/icons/close.svg'
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";


interface ChatPropsType {
  userId: number;
  agentName: string;
  avatar: string;
  openChat: boolean;
  setOpenChat: (param: boolean) => void;
  orderId: number;
  date: string;
}

const ChatBlockB2b = ({
  agentName,
  userId,
  avatar,
  openChat,
  setOpenChat,
  orderId,
  date
}: ChatPropsType) => {

  const pubnub = new PubNub({
    publishKey: 'pub-c-ed0d5f65-4368-492b-a376-0b82917208b9',
    subscribeKey: 'sub-c-7a080724-d4d0-46af-a644-53d651aa3dd4',
    userId: `${userId}`
  });

  const currentChannel = `b2b_order_${orderId}${date.split(" ").join('_').split("-").join("_").split(":").join("_")}`;


  const renderMessage = (props: any) => {
    return (
      <div className={styles.messageBox}>
        <div className={userId === (+props.message.uuid || +props.message.publisher) ? styles.myMessage : styles.message}>
          <p className={styles.messageCreator}>
            {/* <strong>{props.message.publisher}</strong> */}
          </p>
          {
            props.message.message.file ?
              <div>
                {
                  props.message.message.message?.text ?
                    <p className={styles.messageText}>{props.message.message.message.text}</p>
                    :
                    <p className={styles.messageText}>{props.message.message.message}</p>
                }
                <img className={styles.messageImg} src={props.message.message.file.url} alt='img' />
              </div>
              :
              <div>
                <p className={styles.messageText}>{props.message.message.text}</p>
              </div>
          }
        </div>
      </div>
    );
  };


  return (
    <div className={styles.chatBlock}>
      <div className={styles.topBlock}>
        <img src={avatar} alt={'avatar'} className={styles.avatar} />
        <p className={styles.userName}>{agentName}</p>
        <img
          src={close}
          alt="close"
          className={styles.close}
          style={openChat ? { display: 'block' } : { display: 'none' }}
          onClick={() => setOpenChat(false)}
        />
      </div>
      <PubNubProvider client={pubnub}>
        <Chat {...{ currentChannel }}>
          <MessageList messageRenderer={renderMessage} fetchMessages={10} />
          <MessageInput fileUpload='all' />
        </Chat>
      </PubNubProvider>
    </div>
  )
}

export default ChatBlockB2b