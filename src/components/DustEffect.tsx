'use client';
import React from 'react';

const getRandom = (min: number, max: number) =>
{
    return Math.round(Math.random() * (max - min)) + min;
};

interface IDustEffectProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
    particle?: number;
    particleRGB?: string;
    particleAlpha?: number;
    particleLimitAlpha?: number;
    particleMaxSize?: number;
    particleMinSize?: number;
    MaxSpeed?: number;
    MinSpeed?: number;
    className?: string
}

const DustEffect = (props: IDustEffectProps) => 
{
    const {
        particle = 10, //입자 수
        particleRGB = '255,255,255', //입자 색상
        particleAlpha = 1, //입자 투명도
        particleLimitAlpha = 1, //입자 투명도 한계값
        particleMaxSize = 1, //입자 최대 사이즈
        particleMinSize = 1, //입자 최소 사이즈
        MaxSpeed = 1000, //ms
        MinSpeed = 100, //ms
        className = 'h-full w-full',
        ...rest
    } = props;
    //ref
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    class CanvasEvent 
    {
        x!: number;
        y!: number;
        dx!: number;
        dy!: number;
        size!: number;
        alpha!: number;
        dalpha!: number;
        color: string;
        maxSize: number;
        minSize: number;
        maxSpeed: number;
        minSpeed: number;
        maxAlpha: number;
        limitAlpha: number;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D | null;
        constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null)
        {
            this.canvas = canvas;
            this.ctx = ctx;
            this.color = particleRGB;
            this.maxAlpha = particleAlpha;
            this.limitAlpha = particleLimitAlpha,
            this.maxSize = particleMaxSize;
            this.minSize = particleMinSize;
            this.maxSpeed = MaxSpeed / 1000;
            this.minSpeed = MinSpeed / 1000;
            this.reset();
        }
        reset()
        {
            const angle = Math.random() * Math.PI * 2; //0~360도
            const speed = getRandom(this.minSpeed, this.maxSpeed);
            //init
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.x = getRandom(0, this.canvas.width);
            this.y = getRandom(0, this.canvas.height);
            this.alpha = getRandom(0, this.maxAlpha);
            this.dx = Math.cos(angle) * speed;
            this.dy = Math.sin(angle) * speed;
            this.dalpha = 0.1;
            this.size = getRandom(this.minSize, this.maxSize);
        }
        draw()
        {
            if(this.ctx)
            {
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                this.ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
        update()
        {
            this.x += this.dx;
            this.y += this.dy;

            if (this.alpha < this.limitAlpha)
            {
                this.alpha += this.dalpha;
            }

            if (this.x <= 0 || this.x >= this.canvas.width || this.y <= 0 || this.y >= this.canvas.height) 
            {
                this.reset();
            }
        }
    }

    React.useLayoutEffect(() => 
    {
        const canvas = canvasRef.current;
        if (canvas) 
        {
            const ctx = canvas.getContext('2d');
            const resizeObserverCallback = () => 
            {
                const particles: CanvasEvent[] = [];
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
    
                for (let i = 0; i < particle; i++) 
                {
                    particles.push(new CanvasEvent(canvas, ctx));
                }
    
                const animate = () => 
                {
                    if (ctx) 
                    {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        particles.forEach((event) => 
                        {
                            event.update();
                            event.draw();
                        });
                        requestAnimationFrame(animate);
                    }
                };
    
                animate();
            };

            const resizeObserver = new ResizeObserver(resizeObserverCallback);
            resizeObserver.observe(canvas);

            return () => 
            {
                resizeObserver.disconnect();
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas
            {...rest}
            ref={canvasRef}
            className={className}
        />
    );
};

export default DustEffect;