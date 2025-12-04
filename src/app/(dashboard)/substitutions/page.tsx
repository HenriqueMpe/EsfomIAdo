'use client';

import { useState } from 'react';
import { RefreshCw, Search, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { mockData } from '@/data/mock';
import { useGeminiAI } from '@/hooks/useGeminiAI';

export default function SubstitutionsPage() {
    const { findSubstitutions, loading } = useGeminiAI();
    const [searchTerm, setSearchTerm] = useState('');
    const [aiResults, setAiResults] = useState<any>(null);
    const [restrictions, setRestrictions] = useState('');
    const [goal, setGoal] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const filteredSubstitutions = mockData.substitutions.filter(sub =>
        sub.original.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAISearch = async () => {
        if (!searchTerm.trim()) return;
        const results = await findSubstitutions(searchTerm, restrictions, goal);
        setAiResults(results);
    };

    const handleClearAI = () => {
        setAiResults(null);
        setSearchTerm('');
        setRestrictions('');
        setGoal('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <RefreshCw className="w-8 h-8 text-orange-500" />
                    Substituicoes Alimentares
                </h1>
                <p className="text-slate-500 mt-2">Encontre equivalentes com IA ou busque na base de dados.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            placeholder="Digite um alimento (ex: Arroz, Frango, Leite)..."
                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-3 border rounded-lg hover:bg-slate-50 text-slate-600"
                    >
                        Filtros
                    </button>
                    <button
                        onClick={handleAISearch}
                        disabled={loading || !searchTerm.trim()}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-70 transition-all shadow-lg shadow-orange-200"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5" />
                        )}
                        Buscar com IA
                    </button>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t animate-in fade-in slide-in-from-top-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Restricoes Alimentares</label>
                            <input
                                type="text"
                                placeholder="Ex: Sem lactose, Vegano, Sem gluten"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                value={restrictions}
                                onChange={(e) => setRestrictions(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Objetivo</label>
                            <select
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                <option value="Hipertrofia">Hipertrofia</option>
                                <option value="Emagrecimento">Emagrecimento</option>
                                <option value="Manutencao">Manutencao</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {aiResults ? (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-500 rounded-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Substituicoes para: {aiResults.original}</h2>
                                <p className="text-slate-600">Sugeridas pela IA</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClearAI}
                            className="text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-white/50"
                        >
                            Limpar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {aiResults.substitutions.map((sub: any, index: number) => (
                            <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 hover:shadow-md transition-all">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800 mb-1">{sub.name}</h3>
                                        <p className="text-sm text-slate-600">{sub.reason}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-800">Substituicoes Rapidas</h2>
                        <span className="text-sm text-slate-500">{filteredSubstitutions.length} resultados</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSubstitutions.map((sub, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                        {sub.original.charAt(0)}
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-lg">{sub.original}</h3>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pode ser trocado por:</p>
                                    <ul className="space-y-2">
                                        {sub.options.map((option, i) => (
                                            <li key={i} className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg">
                                                <ArrowRight className="w-4 h-4 text-orange-400" />
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        {filteredSubstitutions.length === 0 && !searchTerm && (
                            <div className="col-span-full text-center py-12 text-slate-400">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                <p className="text-lg">Use a busca com IA para encontrar substituicoes personalizadas!</p>
                            </div>
                        )}

                        {filteredSubstitutions.length === 0 && searchTerm && (
                            <div className="col-span-full text-center py-12">
                                <p className="text-slate-400 mb-4">Nenhuma substituicao encontrada na base de dados</p>
                                <button
                                    onClick={handleAISearch}
                                    className="text-orange-600 font-medium hover:underline flex items-center gap-2 mx-auto"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Tentar busca com IA
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
