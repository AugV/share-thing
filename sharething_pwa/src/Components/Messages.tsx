import React from 'react';
import 'react-chat-elements/dist/main.css';
import { Message } from '../Entities/Interfaces';
import { MessageList } from 'react-chat-elements';
import { Spinner } from 'react-bootstrap';

interface Props {
    messages: Message[] | undefined;
}

const MessagesComponent = (props: Props) => {
    const { messages } = props;

    return(
            messages ?
            (
            <MessageList
                dataSource={messages}
            />
            )
            : <Spinner animation="border" />
    );
};

export const Messages = MessagesComponent;
