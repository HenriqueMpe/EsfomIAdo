import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { goal, calories } = await request.json();

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        const prompt = `Crie uma dieta detalhada para o objetivo: ${goal} com ${calories} calorias diárias.
    
Retorne APENAS um JSON válido (sem markdown, sem \`\`\`json) no seguinte formato:
{
  "name": "Nome da Dieta",
  "calories": ${calories},
  "meals": [
    {
      "name": "Café da Manhã",
      "items": ["item 1", "item 2"]
    }
  ]
}`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        if (!response.ok) {
            throw new Error('Gemini API error');
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid response format');
        }

        const diet = JSON.parse(jsonMatch[0]);
        return NextResponse.json(diet);

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate diet' },
            { status: 500 }
        );
    }
}
