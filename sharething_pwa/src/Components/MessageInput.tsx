import React, { useState, useRef } from 'react';
import 'react-chat-elements/dist/main.css';
import { Input, Button } from 'react-chat-elements';

const MessageInputComponent = () => {
// const [input, setInput] = useState<string>();
    const inputE = useRef(null);
    const onButtonClick = () => {
    // `current` points to the mounted text input element
    // @ts-ignore
        inputE.current = '1000';

    };

    return (
        <Input
        ref={inputE}
        placeholder="Type here..."
        multiline={true}
        rightButtons={
            <Button
                text={'click me!'}
                onClick={onButtonClick}/>
    }/>
    );
};
export const MessageInput = MessageInputComponent;
