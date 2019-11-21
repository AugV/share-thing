import React from 'react';
import { MessageList } from './MessageList';
import { RouteComponentProps } from 'react-router';

const msgList = [
    { author: 'test', text: 'test' }, { author: 'test1', text: 'test1' }, { author: 'test2', text: 'test2' },
];

type Props= RouteComponentProps<any>;

export const ConvoScreen = (props: Props) => {

    useEffect(() => {
        effect;
        return () => {
            cleanup;
        };
    }, []);

    return(
        <div>
    <MessageList messages={msgList}/>
    {/* <InputField /> */}
        </div>
    );
};

