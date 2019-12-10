import React, { useEffect, useState } from 'react';
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
    const [convo, setConvo] = useState<ConversationInfo>();
    const [messages, setMessages] = useState<Message[]>();

    useEffect(() => {
        props.firebase.getConvo(props.match.params.id).then((conversation) => {
            const { conversationInfo, messagesRef } = conversation;
            setConvo(conversationInfo);

            const currentUser = props.firebase.auth.currentUser!.email;

            return messagesRef.onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => docToMessage(doc, currentUser!)));
            });

        });
        console.log('fetching convo');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div>
            <h2>{convo && convo.itemName}</h2>
            <Messages messages={messages}/>
            <MessageInput />
        </div>
    );
};
export const ConvoScreen = withFirebase(ConvoContainer);
