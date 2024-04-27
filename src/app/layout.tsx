import type { Metadata } from 'next';
import '../styles/globals.css';
//component

export const metadata: Metadata = {
    title: 'GRAY',
    description: '안녕하세요. Gray 입니다!',
};

const RootLayout = ({children}: Readonly<{children: React.ReactNode;}>) => 
{
    return (
        <html lang="ko">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;