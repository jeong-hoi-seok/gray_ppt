'use client';
import React from 'react';

interface ITextEffectProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text?: string;
    delay?: number;
}

const TextEffect = (props: ITextEffectProps) => 
{
    const {
        
        text, //텍스트 값
        delay = 50, //글자 하나의 딜레이 값
        ...rest
    } = props;
    const dom = React.useRef<HTMLParagraphElement | null>(null);
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const observerEvent: IntersectionObserverCallback = React.useCallback((entrise) => 
    {
        entrise.forEach(entry => 
        {
            if(entry.isIntersecting)
            {
                setIsVisible(true);
            }
        });
    }, []);

    React.useEffect(() => 
    {
        const el = dom.current;
        
        if(el)
        {
            const observer = new IntersectionObserver(observerEvent, {threshold: 1});
            observer.observe(el);

            return () => 
            {
                observer && observer.disconnect();
            };
        }
    }, [observerEvent]);

    return (
        <p
            ref={dom}
            {...rest}
        >
            {
                isVisible && text?.split('').map((part, idx) => 
                {
                    return (
                        <span
                            key={idx}
                            className='animate-show-blur opacity-0'
                            style={{
                                animationDelay: (delay * idx) + 'ms',
                            }}
                        >
                            {part}
                        </span>
                    );
                })
            }
        </p>
    );
};

export default TextEffect;