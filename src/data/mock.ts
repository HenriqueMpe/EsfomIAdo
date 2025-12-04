export const mockData = {
  foods: [
    { id: 1, name: 'Arroz Branco (100g)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { id: 2, name: 'Peito de Frango (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 3, name: 'Ovo Cozido (un)', calories: 70, protein: 6, carbs: 0.6, fat: 5 },
    { id: 4, name: 'Banana Prata (un)', calories: 68, protein: 0.9, carbs: 18, fat: 0.2 },
    { id: 5, name: 'Aveia em Flocos (30g)', calories: 110, protein: 4, carbs: 17, fat: 2 },
    { id: 6, name: 'Leite Desnatado (200ml)', calories: 70, protein: 6, carbs: 10, fat: 0 }
  ],
  substitutions: [
    { original: 'Arroz Branco', options: ['Arroz Integral', 'Quinoa', 'Batata Doce', 'Batata Inglesa'] },
    { original: 'Pao Frances', options: ['Tapioca', 'Cuscuz', 'Pao Integral', 'Aveia'] },
    { original: 'Peito de Frango', options: ['Peixe Branco', 'Patinho Moido', 'Ovos', 'Tofu'] }
  ],
  patients: [
    {
      id: 1,
      name: 'Joao Silva',
      age: 32,
      weight: 85,
      height: 178,
      goal: 'Hipertrofia',
      history: [
        { date: '2023-10-01', weight: 88 },
        { date: '2023-11-01', weight: 86 },
        { date: '2023-12-01', weight: 85 }
      ]
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      age: 28,
      weight: 62,
      height: 165,
      goal: 'Emagrecimento',
      history: [
        { date: '2023-10-01', weight: 65 },
        { date: '2023-11-01', weight: 63 },
        { date: '2023-12-01', weight: 62 }
      ]
    },
     {
      id: 3,
      name: 'Carlos Pereira',
      age: 45,
      weight: 92,
      height: 180,
      goal: 'Reeducacao Alimentar',
      history: [
        { date: '2023-10-01', weight: 95 },
        { date: '2023-11-01', weight: 93 },
        { date: '2023-12-01', weight: 92 }
      ]
    }
  ],
  diets: [
    {
      name: 'Dieta Padrao - Hipertrofia',
      calories: 2500,
      meals: [
        { name: 'Cafe da Manha', items: ['3 Ovos', '2 Fatias Pao Integral', '1 Cafe sem acucar'] },
        { name: 'Almoco', items: ['150g Arroz', '150g Frango', 'Salada a vontade'] },
        { name: 'Lanche da Tarde', items: ['1 Banana', '30g Aveia', '1 Scoop Whey Protein'] },
        { name: 'Jantar', items: ['150g Batata Doce', '150g Patinho Moido', 'Legumes'] }
      ]
    }
  ]
};

export default mockData;
