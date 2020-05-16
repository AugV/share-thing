import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import { withFirebase } from '../../Firebase';
import { Message, SharegResponse } from '../../Entities/Interfaces';
import { Messages } from '../../Components/Messages';
import { MessageInput } from '../../Components/MessageInput';
import { FirebaseProps } from '../../Entities/PropsInterfaces';
import { useParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import './chat-input.css';

interface ChatProps {
    details: SharegResponse;
}

type Props = ChatProps & FirebaseProps;

const ChatPage: React.FC<Props> = (props) => {
    const { details, firebase } = props;
    const [messages, setMessages] = useState<Message[] | undefined>(undefined);

    const { id } = useParams();
    const scrollBottomDummy = useRef<any>(null);

    const sendMessage = (text: string) => {
        props.firebase.sendMessage(id!, text);
    };

    const messageListener = (fetchedMessages: Message[]) => {
        setMessages(fetchedMessages);
    };

    useEffect(() => {
        return firebase.getChatMessages(id!, messageListener);
    }, [firebase, id]);

    useEffect(() => {
        scrollBottomDummy!.current!.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return(
        <div>
            {
                !messages
                ?  <div className="no-item-message">
                        <Typography>
                            No items to display
                        </Typography>
                    </div>
                : (
                    <div style={messageList}>
                        <Messages messages={messages}/>
                    </div>
                )
            }

            <div ref={scrollBottomDummy}/>

            <div className="chat-input">
                <MessageInput submit={sendMessage}/>
            </div>
        </div>
    );
};

const messageList: CSSProperties = {
    paddingBottom: '50px',
};

export const Chat = withFirebase(ChatPage);
