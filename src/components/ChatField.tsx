import React from 'react';
import Progress from './Progress';

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
                                <div className={`px-4 py-2 rounded-2xl ${chat.target === 'gpt' ? 'bg-gray-700' : 'bg-yellow-300 text-gray-700'}`}>
                                    <p>{chat.message}</p>
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