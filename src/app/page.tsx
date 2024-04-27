'use client'
import React from 'react';
import axios from 'axios';
//componens
import DustEffect from '@/components/DustEffect';
import ChatField from '@/components/ChatField';
import Container from '@/components/Container';
import TextInput from '@/components/TextInput';

const Home = () => {
    // useEffect(() => {
    //     axios.post('/api/gpt')
    //     .then((res) => {
    //         console.log(res)
    //     })
    // }, []);

    const gptCallEvent = async () => {
        try {
            const res = await axios.post('/api/gpt', {
                message: '안녕 너에 대해 설명해줄래?'
            });
            const {         
                message
            } = res.data;

            console.log(message.content)
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <Container>
                <div className='flex flex-col pb-8 pt-4 h-dvh overflow-hidden'>
                    <div className='flex-1'>
                        <ChatField/>
                    </div>
                    <TextInput
                        name='gptchat'
                        label='메시지 입력'
                        placeholder='궁금한걸 물어보세요!'
                        endAdornment={
                            <button
                                type='button'
                                onClick={gptCallEvent}
                            >
                                전송
                            </button>
                        }
                        onChange={() => {}}
                        onKeyUp={(e) => {
                            if(e.key === 'Enter') {
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