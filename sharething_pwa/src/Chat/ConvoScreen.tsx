import React, { useEffect, useState }  from 'react';
import { MessagesList } from './MessageList';
import { RouteComponentProps } from 'react-router';
import Firebase, { withFirebase } from '../Firebase';
import { Conversation, Message, docToMessage } from '../Entities/Interfaces';

const msgList: Message[] = [
    { id: 'test', author: 'test', text: 'test', time: '12:00:00 AM' },
];

interface OwnProps {
    firebase: Firebase;
}

type Props= OwnProps & RouteComponentProps<any>;

const ConvoContainer = (props: Props) => {
    const [convo, setConvo] = useState<Conversation>();
    const [messages, setMessages] = useState<Message[]>(msgList);

    useEffect(() => {
        props.firebase.getConvo(props.match.params.id).then((convoPack) => {
            const [convoDetails, messagesRef] = convoPack;
            setConvo(convoDetails);

            return messagesRef.onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(docToMessage));
            });

        });
        console.log('fetching convo');
    }, []);

    return(
        <div>
            <h2>{convo && convo.itemName}</h2>
            <MessagesList messages={messages}/>
            {/* <InputField /> */}
        </div>
    );
};
export const ConvoScreen = withFirebase(ConvoContainer);
