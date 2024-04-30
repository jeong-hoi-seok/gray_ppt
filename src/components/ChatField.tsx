'use client'
import React from 'react';
import Progress from './Progress';
import TextEffect from './TextEffect';

export interface IChatProps {
    message: string;
    target: 'gpt' | 'user'
}

interface IChatFieldProps {
    chatList?: IChatProps[];
    loading?: boolean;
}

const ChatField: React.FC<IChatFieldProps> = (props) => {
    const {
        chatList,
        loading,
    } = props;
    //ref
    const scrollRef = React.useRef< HTMLUListElement | null>(null);

    React.useEffect(() => {
        const target = scrollRef.current;
        if(target && chatList && chatList.length > 0) {
            target.scrollTo(0, target.scrollHeight);
        }
    }, [chatList]);

    return (
        <div className='h-full py-2 overflow-hidden'>
            <ul ref={scrollRef} className='flex flex-col gap-4 h-full overflow-auto'>
                {
                    chatList &&
                    chatList.map((chat, index) => {
                        return (
                            <li
                                key={index}
                                className={`flex ${chat.target === 'gpt' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`w-[60%] flex ${chat.target === 'gpt' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`inline-block px-4 py-3 rounded-2xl ${chat.target === 'gpt' ? 'bg-zinc-800' : 'bg-yellow-300 text-zinc-800'}`}>
                                        {
                                            chat.target === 'gpt' ?
                                            <TextEffect
                                                text={chat.message}
                                                delay={10}
                                            />
                                            :
                                            <p>{chat.message}</p>
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                {
                    loading &&
                    <li className='text-slate-400/[0.75]'>
                        <Progress stroke={3} size={30}/>
                    </li>
                }
            </ul>
        </div>
    );
};

export default ChatField;