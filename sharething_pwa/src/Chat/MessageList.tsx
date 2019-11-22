import React, { CSSProperties } from 'react';
import { Message } from './Message';

interface Message {
    author: string;
    text: string;
}

interface Props {
    messages: Message[];
}

// TODO:React.memo()??
const MessageList = (props: Props) => {

    return (<div>
            <ul style={myStyles}>
                {props.messages.map((message, index) => (
                    <li key={index}>
                        <Message {...message}/>
                    </li>
                ))}
            </ul>
        </div>)
    ;
};

const myStyles: CSSProperties = {
    listStyleType:  'none',
};

export const MessagesList = React.memo(MessageList);
