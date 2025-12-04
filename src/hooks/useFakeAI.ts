import { useState } from 'react';

export function useFakeAI() {
    const [loading, setLoading] = useState(false);

    const generateDiet = async (patientGoal: string) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                setLoading(false);
                resolve({
                    name: `Dieta Personalizada - ${patientGoal}`,
                    calories: 2200,
                    meals: [
                        { name: "Cafe da Manha", items: ["2 Ovos", "1 Pao Frances", "Cafe"] },
                        { name: "Almoco", items: ["100g Arroz", "100g Feijao", "120g Frango"] },
                        { name: "Jantar", items: ["Salada Completa", "100g Peixe"] }
                    ]
                });
            }, 2000);
        });
    };

    const analyzeDiet = async (text: string) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                setLoading(false);
                resolve(`Analise da IA: A dieta parece equilibrada, mas notei que a ingestao de proteinas no cafe da manha poderia ser maior. Sugiro adicionar ovos ou queijo cottage. O total calorico estimado esta adequado para o objetivo.`);
            }, 1500);
        });
    };

    return { generateDiet, analyzeDiet, loading };
}
