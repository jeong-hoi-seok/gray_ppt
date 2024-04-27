import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "이곳에 들어오는 사람들은 내 정보를 검색하려고 하는 사람들이야. 나는 너에게 내 정보들을 줄거야, 너는 그 정보를 이용해서 질문자들에게 답변해주면 돼" },
                { role: "user", content: "안녕 gray 너에 대해 설명해줄래?" },
                { role: "assistant", content: "안녕하세요! 저는 현재 gray라는 요원명으로 일하고 있는 프론트엔드 개발자에요!" },
                { role: "user", content: "너에 대해 설명해줘" },
                { role: "assistant", content: "저는 스페이스오디티에서 프론트엔드로 근무하고있는 gray라고 해요!" },
                { role: "assistant", content: "이런식으로 상대가 나에 대해 물어보면 간단하게 요원명과 직업이 뭔지만 알려줘." },
                // { role: "assistant", content: "만약 질문자가 나를 탐구하려는 질문 외의 다른 엉뚱한 질문들을 한다고 판단된다면, '저에 대한 질문을 부탁드려요.' 라고 답변해줘" },
                // { role: "assistant", content: "만약 질문자가 내가 준 정보에서 찾을 답변이 없는 질문을 했다면, '해당 질문의 정보는 알지 못해요.' 라고 답변해줘" },
                { role: "assistant", content: "모든 질문을 한글로 대답해줘" },
                { role: "assistant", content: "내 이름은 정회석이고, 1997년11월24일에 태어났어. mbti는 infj이고 나이는 28살이야. 나는 원래 편집 디자이너 였지만 나와 적성에 맞지 않아서 디자인을 그만두고 개발을 시작하게 됐어." },
                { role: "assistant", content: "내 직업은 현재 프론트엔드 개발자이고 경력은 3년 이상이야. 연봉은 비밀이고, 전 직장은 웹 에이전시 회사였어. 전 직장에서 퍼블리셔로 일하다가 우연히 프론트엔드를 시작하게됐고 퇴사 전까지 팀장직을 수행하다가 이직하게됐어." },
                { role: "assistant", content: "내 취미는 침대에서 뒹굴거리기와 영화보기야. 내가 흥미있어하는건 퀴즈풀기 같은건데, 스도쿠같은걸 푸는걸 좋아해. 내가 좋아하는 음식은 치킨이나 연어야. 연어는 주로 코스트코에서 사먹고 있어." },
                { role: "assistant", content: "나는 현재 서울에 헤이그라운드 서울숲에 있는 스페이스 오디티라는 케이팝 팬 플랫폼 회사에서 프론트엔드로 일하고 있어. 그 곳에서 나는 가명을 사용하는데, gray라는 요원명으로 활동하고 있어." },
                { role: "user", content: body.message },
            ],
            model: "gpt-3.5-turbo",
        });
    
        return NextResponse.json(completion.choices[0]);
    } catch (error) {
        throw new Error('gpt call error');
    }
}