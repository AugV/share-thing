import React from 'react';

interface Props {
    author: string;
    text: string;
}

export const Message = (props: Props) => {

    return (
        <div>
            <text>{props.author}</text>
            <text>{props.text}</text>
        </div>
    );
};

