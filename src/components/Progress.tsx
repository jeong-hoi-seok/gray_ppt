import React from 'react';

const Progress = ({ size = 40, stroke = 4 }) => {
    const radius = size / 2;
    const round = radius - stroke / 2;
    const offset = Math.round(2 * Math.PI * round);

    return (
        <span
            className="inline-block animate-rotate"
            style={{
                width: `${size}px`,
                height: `${size}px`
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${size} ${size}`}
                className="block stroke-current"
            >
                <circle
                    cx={radius}
                    cy={radius}
                    r={round}
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={stroke}
                    strokeDasharray={offset}
                    strokeDashoffset={offset}
                    className='animate-progress'
                    style={{
                        "--offset": offset,
                        "--unoffset": (offset * -1)
                    } as React.CSSProperties}
                />
            </svg>
        </span>
    );
};

export default Progress;
