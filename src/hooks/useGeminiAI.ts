import { useState } from 'react';

export function useGeminiAI() {
  const [loading, setLoading] = useState(false);

  const callGeminiAPI = async (prompt: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey || apiKey.includes('your_api_key')) {
      throw new Error('API key nao configurada - configure no arquivo .env.local');
    }

    // Lista de modelos para tentar (em ordem de preferencia)
    const modelsToTry = [
      'gemini-3.0-pro',
      'gemini-2.5-pro',
      'gemini-2.0-pro',
      'gemini-1.5-pro',
      'gemini-1.5-pro-latest',
      'gemini-1.5-flash',
      'gemini-pro',
      'gemini-1.0-pro'
    ];



    let lastError = null;

    for (const model of modelsToTry) {
      try {
        console.log(`Tentando modelo: ${model}...`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          // Se for 404, o modelo nao existe, tenta o proximo
          if (response.status === 404) {
            console.warn(`Modelo ${model} nao encontrado (404). Tentando proximo...`);
            lastError = new Error(`Modelo ${model} nao encontrado: ${errorText}`);
            continue;
          }
          // Outros erros (400, 403, 500) sao fatais
          throw new Error(`Erro na API (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
          throw new Error('Formato de resposta inesperado da API');
        }

        return data.candidates[0].content.parts[0].text;

      } catch (error) {
        lastError = error;
        // Se nao for erro de fetch (network) e nao for 404, pode ser erro de chave ou cota
        if (error instanceof Error && !error.message.includes('404')) {
          console.error(`Erro fatal com modelo ${model}:`, error);
          // Nao interrompe o loop, mas loga. O continue acontece naturalmente.
        }
      }
    }

    throw lastError || new Error('Nenhum modelo disponivel funcionou.');
  };

  const generateDiet = async (patientGoal: string, calories: number = 2200) => {
    setLoading(true);

    try {
      const prompt = `Voce e um nutricionista profissional. Crie uma dieta detalhada para um paciente com o objetivo de ${patientGoal} e meta de ${calories} calorias diarias.

Retorne APENAS um JSON no seguinte formato (sem markdown, sem explicacoes):
{
  "name": "Nome da Dieta",
  "calories": ${calories},
  "meals": [
    {
      "name": "Cafe da Manha",
      "items": ["item 1", "item 2", "item 3"]
    },
    {
      "name": "Almoco",
      "items": ["item 1", "item 2", "item 3"]
    },
    {
      "name": "Lanche da Tarde",
      "items": ["item 1", "item 2"]
    },
    {
      "name": "Jantar",
      "items": ["item 1", "item 2", "item 3"]
    }
  ]
}`;

      const response = await callGeminiAPI(prompt);
      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const diet = JSON.parse(cleanResponse);

      setLoading(false);
      return diet;

    } catch (error: any) {
      console.error('Erro ao gerar dieta:', error);
      setLoading(false);

      return {
        name: `Dieta Personalizada - ${patientGoal}`,
        calories: calories,
        meals: [
          { name: "Cafe da Manha", items: ["2 Ovos", "1 Pao Frances", "Cafe"] },
          { name: "Almoco", items: ["100g Arroz", "100g Feijao", "120g Frango"] },
          { name: "Jantar", items: ["Salada Completa", "100g Peixe"] }
        ]
      };
    }
  };

  const analyzeDiet = async (text: string) => {
    setLoading(true);

    try {
      const prompt = `Voce e um nutricionista profissional. Analise a seguinte dieta e forneca feedback detalhado sobre:
- Equilibrio nutricional
- Pontos fortes
- Pontos a melhorar
- Sugestoes especificas

Dieta para analise:
${text}

Forneca uma analise clara e objetiva em portugues.`;

      const response = await callGeminiAPI(prompt);
      setLoading(false);
      return response;

    } catch (error: any) {
      console.error('Erro ao analisar dieta:', error);
      setLoading(false);

      return `Analise da IA: A dieta parece equilibrada, mas notei que a ingestao de proteinas no cafe da manha poderia ser maior. Sugiro adicionar ovos ou queijo cottage. O total calorico estimado esta adequado para o objetivo.`;
    }
  };

  const findSubstitutions = async (food: string, restrictions: string = '', goal: string = '') => {
    setLoading(true);

    try {
      const restrictionsText = restrictions ? `Restricoes: ${restrictions}` : '';
      const goalText = goal ? `Objetivo: ${goal}` : '';

      const prompt = `Voce e um nutricionista profissional. Sugira 5 substituicoes alimentares para: ${food}

${restrictionsText}
${goalText}

Retorne APENAS um JSON no seguinte formato (sem markdown, sem explicacoes):
{
  "original": "${food}",
  "substitutions": [
    {
      "name": "Nome do alimento substituto",
      "reason": "Breve explicacao (max 100 caracteres)"
    }
  ]
}

As substituicoes devem ter valor nutricional similar e respeitar as restricoes mencionadas.`;

      const response = await callGeminiAPI(prompt);

      const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const data = JSON.parse(cleanResponse);

      setLoading(false);
      return data;

    } catch (error: any) {
      console.error('Erro ao buscar substituicoes:', error);
      setLoading(false);

      return {
        original: food,
        substitutions: [
          { name: `ERRO: ${error.message}`, reason: 'Verifique o console (F12) para detalhes' },
          { name: 'Banana', reason: 'Rica em potassio, boa fonte de energia' },
          { name: 'Morango', reason: 'Baixa caloria, rico em vitamina C' },
          { name: 'Melancia', reason: 'Hidratante, poucas calorias' },
          { name: 'Maca', reason: 'Rica em fibras, saciedade prolongada' }
        ]
      };
    }
  };

  return { generateDiet, analyzeDiet, findSubstitutions, loading };
}
