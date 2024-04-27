import React from 'react';

interface IContainerProps {
    children?: React.ReactNode;
}

const Container: React.FC<IContainerProps> = (props) => {
    const {
        children
    } = props;

    return (
        <section className='container'>
            {children}
        </section>
    );
};

export default Container;