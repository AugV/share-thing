import React, { useEffect, useState, CSSProperties, useRef } from 'react';
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
    const scrollBottomDummy = useRef<any>(null);

    const sendMessage = (text: string) => {
        props.firebase.sendMessage(text, messagesRef!);
    };

    useEffect(() => {
        props.firebase.getConvo(props.match.params.id).then((conversation) => {
            const { conversationInfo, messagesRef: msgRef } = conversation;

            setConvoInfo(conversationInfo);
            setMessagesRef(msgRef);

            const currentUser = props.firebase.auth.currentUser!.uid;

            return msgRef.orderBy('time', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => docToMessage(doc, currentUser!)));
            });

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {scrollBottomDummy!.current!.scrollIntoView({ behavior: 'smooth' }); },
            [messages],
            );

    return(
        <div>
            <div className="sticky-top" >
                <h2>{convoInfo && convoInfo.itemName}</h2>
            </div>

            <div style={messageList}>
                <Messages messages={messages}/>
            </div>

            <div ref={scrollBottomDummy}/>

            <div className="fixed-bottom">
                <MessageInput submit={sendMessage}/>
            </div>
        </div>
    );
};

const messageList: CSSProperties = {
    paddingBottom: '50px',
};

export const ConvoScreen = withFirebase(ConvoContainer);
