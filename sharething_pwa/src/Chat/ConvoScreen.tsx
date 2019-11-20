import React, { useState, useEffect } from 'react';
import { MessageList } from './MessageList';

const msgList = [
    { author: 'test', text: 'test' }, { author: 'test1', text: 'test1' }, { author: 'test2', text: 'test2' },
];

export const ConvoScreen = () => {

    return(
        <div>
    <MessageList messages={msgList}/>
    {/* <InputField /> */}
        </div>
    );
};

