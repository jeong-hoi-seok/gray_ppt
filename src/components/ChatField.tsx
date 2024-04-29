import React from 'react';

export interface IChatProps {
    message: string;
    target: 'gpt' | 'user'
}

interface IChatFieldProps {
    chatList?: IChatProps[];
}

const ChatField: React.FC<IChatFieldProps> = (props) => {
    const {
        chatList
    } = props;

    return (
        <div className='h-full py-2 overflow-hidden'>
            <ul className='flex flex-col gap-4 h-full overflow-auto'>
                {
                    chatList &&
                    chatList.map((chat, index) => {
                        return (
                            <li
                                key={index}
                                className={`flex ${chat.target === 'gpt' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`px-4 py-2 rounded-2xl ${chat.target === 'gpt' ? 'bg-gray-700' : 'bg-yellow-300 text-gray-700'}`}>
                                    <span>{chat.message}</span>
                                </div>
                            </li>

                        )
                    })
                }
            </ul>
        </div>
    );
};

export default ChatField;