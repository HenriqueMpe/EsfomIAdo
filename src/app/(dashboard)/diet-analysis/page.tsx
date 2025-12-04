'use client';

import { useState } from 'react';
import { FileText, Loader2, ArrowRight } from 'lucide-react';
import { useGeminiAI } from '@/hooks/useGeminiAI';

export default function DietAnalysisPage() {
    const { analyzeDiet, loading } = useGeminiAI();
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [input, setInput] = useState('');

    const handleAnalyze = async () => {
        if (!input.trim()) return;
        const result = await analyzeDiet(input) as string;
        setAnalysis(result);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-8 h-8 text-blue-500" />
                    Analise de Dieta
                </h1>
                <p className="text-slate-500 mt-2">Cole o texto da dieta ou relato do paciente para analise instantanea.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[500px]">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Entrada de Dados</h2>
                    <textarea
                        className="flex-1 w-full p-4 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Ex: Cafe da manha: 2 paes com manteiga. Almoco: Arroz, feijao e bife..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !input.trim()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analisar Texto'}
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[500px] overflow-y-auto">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Resultado da Analise</h2>
                    {analysis ? (
                        <div className="prose prose-slate animate-in fade-in">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900 whitespace-pre-wrap">
                                {analysis}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <FileText className="w-12 h-12 mb-4 text-slate-200" />
                            <p>O resultado aparecera aqui</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
