import React, { useRef } from 'react';
import 'react-chat-elements/dist/main.css';
import { Input, Button } from 'react-chat-elements';

interface Props {
    submit: (text: string) => void;
}

const MessageInputComponent = (props: Props) => {
    const inputRef = useRef<any>(null);

    const onButtonClick = () => {
        if (inputRef && inputRef.current && inputRef.current.state.value) {
            props.submit(inputRef.current.state.value);
            inputRef.current.clear();
        }
    };

    return (
        <Input
            ref={inputRef}
            placeholder="Type here..."
            multiline={true}
            rightButtons={
                (
                <Button
                    text={'click me!'}
                    onClick={onButtonClick}
                />
                )
                }
        />
    );
};
export const MessageInput = MessageInputComponent;
