import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { goal, calories } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }


    const prompt = `Voce e um nutricionista experiente. Crie uma dieta VARIADA e PERSONALIZADA para:

OBJETIVO: ${goal}
CALORIAS DIARIAS: ${calories} kcal

INSTRUCOES IMPORTANTES:
1. Varie os alimentos - nao repita os mesmos ingredientes em todas as refeicoes
2. Inclua diferentes fontes de proteina (frango, peixe, ovos, carne vermelha, leguminosas)
3. Varie os carboidratos (arroz, batata doce, aveia, quinoa, pao integral, frutas)
4. Inclua vegetais e verduras variados
5. Seja especifico nas quantidades (ex: "150g de frango", "2 ovos", "1 xicara de arroz")
6. Distribua as calorias de forma equilibrada entre as refeicoes

Retorne APENAS um JSON valido (sem markdown, sem explicacoes) no formato:
{
  "name": "Nome criativo da dieta",
  "calories": ${calories},
  "meals": [
    {
      "name": "Cafe da Manha",
      "items": ["item 1 com quantidade", "item 2 com quantidade"]
    },
    {
      "name": "Lanche da Manha",
      "items": ["item 1 com quantidade"]
    },
    {
      "name": "Almoco",
      "items": ["item 1 com quantidade", "item 2 com quantidade", "item 3 com quantidade"]
    },
    {
      "name": "Lanche da Tarde",
      "items": ["item 1 com quantidade"]
    },
    {
      "name": "Jantar",
      "items": ["item 1 com quantidade", "item 2 com quantidade"]
    }
  ]
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    if (!response.ok) throw new Error('Gemini API error');

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error('Invalid response format');

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate diet' }, { status: 500 });
  }
}
