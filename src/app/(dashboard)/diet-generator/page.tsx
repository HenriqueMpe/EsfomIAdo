'use client';

import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { usePatients } from '@/hooks/usePatients';
import { Toast } from '@/components/Toast';

export default function DietGeneratorPage() {
    const { generateDiet, loading } = useGeminiAI();
    const { patients } = usePatients();
    const [generatedDiet, setGeneratedDiet] = useState<any>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [selectedGoal, setSelectedGoal] = useState('Hipertrofia');
    const [targetCalories, setTargetCalories] = useState(2200);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const selectedPatient = selectedPatientId ? patients.find(p => p.id === selectedPatientId) : null;

    const handleGenerate = async () => {
        const diet = await generateDiet(selectedGoal, targetCalories);
        setGeneratedDiet(diet);
    };

    const handleRegenerate = async () => {
        setGeneratedDiet(null);
        await handleGenerate();
    };

    const handleSave = () => {
        if (!generatedDiet) return;

        const savedDiets = JSON.parse(localStorage.getItem('savedDiets') || '[]');
        const dietToSave = {
            ...generatedDiet,
            patientId: selectedPatientId,
            patientName: selectedPatient?.name || 'Sem paciente',
            savedAt: new Date().toISOString(),
            id: Date.now()
        };
        savedDiets.push(dietToSave);
        localStorage.setItem('savedDiets', JSON.stringify(savedDiets));

        setToastMessage(`Dieta salva para ${selectedPatient?.name || 'paciente'}!`);
        setShowToast(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                    Gerador de Dietas IA
                </h1>
                <p className="text-slate-500 mt-2">Crie planos alimentares personalizados em segundos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-semibold text-slate-800 mb-4">Configuracao</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Paciente</label>
                                <select
                                    className="w-full p-3 border rounded-lg bg-slate-50"
                                    value={selectedPatientId || ''}
                                    onChange={(e) => setSelectedPatientId(e.target.value ? parseInt(e.target.value) : null)}
                                >
                                    <option value="" disabled>Selecione um paciente</option>
                                    {patients.map(patient => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name} - {patient.goal}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Objetivo</label>
                                <select
                                    className="w-full p-3 border rounded-lg bg-slate-50"
                                    value={selectedGoal}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                >
                                    <option>Hipertrofia</option>
                                    <option>Emagrecimento</option>
                                    <option>Manutencao</option>
                                    <option>Ganho de Massa</option>
                                    <option>Definicao Muscular</option>
                                    <option>Saude Geral</option>
                                    <option>Performance Esportiva</option>
                                    <option>Recuperacao Pos-Treino</option>
                                    <option>Aumento de Energia</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Calorias Alvo</label>
                                <input
                                    type="number"
                                    value={targetCalories}
                                    onChange={(e) => setTargetCalories(parseInt(e.target.value))}
                                    className="w-full p-3 border rounded-lg bg-slate-50"
                                />
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Gerando...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Gerar Dieta com IA
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {generatedDiet ? (
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">{generatedDiet.name}</h2>
                                    <p className="text-green-600 font-medium">{generatedDiet.calories} kcal diarias</p>
                                    {selectedPatient && (
                                        <p className="text-sm text-slate-500 mt-1">Para: {selectedPatient.name}</p>
                                    )}
                                </div>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <CheckCircle className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {generatedDiet.meals.map((meal: any, index: number) => (
                                    <div key={index} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                                        <h3 className="font-semibold text-slate-700 mb-2">{meal.name}</h3>
                                        <ul className="space-y-2">
                                            {meal.items.map((item: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2 text-slate-600">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={handleRegenerate}
                                    disabled={loading}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
                                >
                                    Regerar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Salvar Dieta
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-12">
                            <Sparkles className="w-12 h-12 mb-4 text-slate-300" />
                            <p className="text-lg">Configure os parametros e clique em gerar</p>
                        </div>
                    )}
                </div>
            </div>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}
