import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export async function POST() {

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "user", content: "내나이는28" },
            { role: "user", content: "나는남자" },
            { role: "system", content: "나는 몇살이고 성별은?" }
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0])

    return NextResponse.json({msg: completion.choices[0]})
}