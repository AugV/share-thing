import React, { useEffect, useState, CSSProperties } from 'react';
import { RouteComponentProps } from 'react-router';
import Firebase, { withFirebase } from '../../Firebase';
import { ConversationInfo, Message, docToMessage } from '../../Entities/Interfaces';
import { Messages } from '../../Components/Messages';
import { MessageInput } from '../../Components/MessageInput';

interface OwnProps {
    firebase: Firebase;
}

type Props= OwnProps & RouteComponentProps<any>;

const ConvoContainer = (props: Props) => {
    const [convoInfo, setConvoInfo] = useState<ConversationInfo>();
    const [messages, setMessages] = useState<Message[]>();
    const [messagesRef, setMessagesRef] = useState<firebase.firestore.CollectionReference>();

    const sendMessage = (text: string) => {
        props.firebase.sendMessage(text, messagesRef!);
    };

    useEffect(() => {
        props.firebase.getConvo(props.match.params.id).then((conversation) => {
            const { conversationInfo, messagesRef: msgRef } = conversation;

            setConvoInfo(conversationInfo);
            setMessagesRef(msgRef);

            const currentUser = props.firebase.auth.currentUser!.email;

            return msgRef.orderBy('time', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => docToMessage(doc, currentUser!)));
            });

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div>
            <div className="sticky-top" >
                <h2>{convoInfo && convoInfo.itemName}</h2>
            </div>

            <div style={bStyle}>
                <Messages messages={messages}/>
            </div>

            <div className="fixed-bottom">
                <MessageInput submit={sendMessage}/>
            </div>
        </div>
    );
};

const bStyle: CSSProperties = {
    paddingBottom: '60px',
};

export const ConvoScreen = withFirebase(ConvoContainer);
