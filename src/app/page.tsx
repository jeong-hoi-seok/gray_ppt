'use client'
import React from 'react';
import axios from 'axios';
//type
import type { IChatProps } from '@/components/ChatField';
//componens
import DustEffect from '@/components/DustEffect';
import ChatField from '@/components/ChatField';
import Container from '@/components/Container';
import TextInput from '@/components/TextInput';


const Home = () => {
    //state
    const [message, setMessage] = React.useState(''); //gpt 대화 value
    const [chatList, setChatList] = React.useState<IChatProps[]>([]);


    const submitEvent = async (value: string) => {
        try {
            const res = await axios.post('/api/gpt', {
                message: value
            });
            const {         
                message: gptMessage
            } = res.data;

            return gptMessage.content as string;
        } catch (error) {
            console.error(error);
            throw new Error('gpt call error');
        }
    }

    const gptCallEvent = async () => {
        try {
            //reset
            setChatList(prev => {
                return [...prev, {
                    message: message,
                    target: 'user'
                }];
            });

            const chat = await submitEvent(message);
            
            setChatList(prev => {
                return [...prev, {
                    message: chat,
                    target: 'gpt'
                }];
            });
            setMessage('');
            
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <Container>
                <div className='flex flex-col pb-8 pt-4 h-dvh overflow-hidden'>
                    <div className='flex-1 overflow-hidden'>
                        <ChatField
                            chatList={chatList}
                        />
                    </div>
                    <TextInput
                        name='gptchat'
                        label='메시지 입력'
                        placeholder='궁금한걸 물어보세요!'
                        value={message}
                        endAdornment={
                            <button
                                type='button'
                                onClick={gptCallEvent}
                            >
                                전송
                            </button>
                        }
                        onChange={(v) => {
                            setMessage(v);
                        }}
                        onKeyUp={(e) => {
                            if(e.key === 'Enter' && message !== '') {
                                gptCallEvent();
                            }
                        }}
                    />
                </div>
            </Container>
        <DustEffect
            particle={170}
            MinSpeed={100}
            MaxSpeed={400}
            particleMinSize={0.2}
            particleMaxSize={0.7}
            className='fixed top-0 left-0 pointer-events-none block w-full h-full'
            style={{
                zIndex: '-1',
            }}
        />
    </React.Fragment>
    );
};

export default Home;