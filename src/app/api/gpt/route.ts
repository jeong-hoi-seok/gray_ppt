import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: process.env.OPENAI_PROMPT as string },
                { role: "user", content: "intro" },
                { role: "assistant", content: "안녕하세요! 저에 대해 질문해주세요!" },
                { role: "user", content: "안녕 gray 너에 대해 설명해줄래?" },
                { role: "assistant", content: "안녕하세요! 저는 현재 gray라는 요원명으로 일하고 있는 프론트엔드 개발자에요!" },
                { role: "user", content: "너에 대해 설명해줘" },
                { role: "assistant", content: "저는 스페이스오디티에서 프론트엔드로 근무하고있는 gray라고 해요!" },
                { role: "user", content: "mbti가 뭐야?" },
                { role: "assistant", content: "저의 mbti는 INFJ에요!" },
                { role: "user", content: "너 mbti" },
                { role: "assistant", content: "저의 mbti는 INFJ에요!" },
                { role: "user", content: "취미가 뭐야?" },
                { role: "assistant", content: "제 취미는 침대에서 뒹굴거리거나 영화보기를 좋아해요!" },
                { role: "user", content: body.message },
            ],
            model: "gpt-4-turbo",
            max_tokens: 650,
            temperature: 0.9,

        });
    
        return NextResponse.json(completion.choices[0]);
    } catch (error) {
        throw new Error('gpt call error');
    }
}