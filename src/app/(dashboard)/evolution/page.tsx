'use client';

import { useState } from 'react';
import { TrendingUp, Calendar, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { usePatients } from '@/hooks/usePatients';

export default function EvolutionPage() {
    const { patients } = usePatients();
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(patients[0]?.id || null);
    const [selectedPeriod, setSelectedPeriod] = useState(12);

    const selectedPatient = selectedPatientId ? patients.find(p => p.id === selectedPatientId) : null;

    const getFilteredHistory = () => {
        if (!selectedPatient) return [];
        const monthsAgo = new Date();
        monthsAgo.setMonth(monthsAgo.getMonth() - selectedPeriod);
        return selectedPatient.history.filter(entry => new Date(entry.date) >= monthsAgo);
    };

    const weightData = getFilteredHistory().map(entry => ({
        date: new Date(entry.date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
        peso: entry.weight
    }));

    const calculateWeightChange = () => {
        if (weightData.length < 2) return 0;
        return (weightData[weightData.length - 1].peso - weightData[0].peso).toFixed(1);
    };

    const calculateAverageWeight = () => {
        if (weightData.length === 0) return 0;
        const sum = weightData.reduce((acc, entry) => acc + entry.peso, 0);
        return (sum / weightData.length).toFixed(1);
    };

    const weightChange = parseFloat(calculateWeightChange());
    const isPositiveChange = selectedPatient?.goal === 'Ganho de Massa' || selectedPatient?.goal === 'Hipertrofia';
    const isGoodProgress = isPositiveChange ? weightChange > 0 : weightChange < 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-8 h-8 text-purple-500" />
                        Painel de Evolucao
                    </h1>
                    <p className="text-slate-500 mt-2">Acompanhe o progresso dos seus pacientes.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Selecionar Paciente</label>
                        <select
                            className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none"
                            value={selectedPatientId || ''}
                            onChange={(e) => setSelectedPatientId(e.target.value ? parseInt(e.target.value) : null)}
                        >
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.name} - {patient.goal}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Periodo</label>
                        <select
                            className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-purple-500 outline-none"
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
                        >
                            <option value={3}>Ultimos 3 meses</option>
                            <option value={6}>Ultimos 6 meses</option>
                            <option value={12}>Ultimo ano</option>
                            <option value={24}>Ultimos 2 anos</option>
                        </select>
                    </div>
                </div>
            </div>

            {selectedPatient && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-blue-700">Peso Atual</p>
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-blue-900">{selectedPatient.weight} kg</p>
                            <p className="text-sm text-blue-600 mt-2">IMC: {(selectedPatient.weight / ((selectedPatient.height / 100) ** 2)).toFixed(1)}</p>
                        </div>
                        <div className={`bg-gradient-to-br ${isGoodProgress ? 'from-green-50 to-green-100' : 'from-orange-50 to-orange-100'} p-6 rounded-xl shadow-sm border ${isGoodProgress ? 'border-green-200' : 'border-orange-200'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <p className={`text-sm font-medium ${isGoodProgress ? 'text-green-700' : 'text-orange-700'}`}>Variacao no Periodo</p>
                                <div className={`p-2 ${isGoodProgress ? 'bg-green-500' : 'bg-orange-500'} rounded-lg`}>
                                    {weightChange < 0 ? <TrendingDown className="w-4 h-4 text-white" /> : <TrendingUp className="w-4 h-4 text-white" />}
                                </div>
                            </div>
                            <p className={`text-3xl font-bold ${isGoodProgress ? 'text-green-900' : 'text-orange-900'}`}>
                                {weightChange > 0 ? '+' : ''}{calculateWeightChange()} kg
                            </p>
                            <p className={`text-sm ${isGoodProgress ? 'text-green-600' : 'text-orange-600'} mt-2`}>{selectedPeriod} meses</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-purple-700">Peso Medio</p>
                                <div className="p-2 bg-purple-500 rounded-lg">
                                    <Calendar className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-purple-900">{calculateAverageWeight()} kg</p>
                            <p className="text-sm text-purple-600 mt-2">No periodo</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">Evolucao de Peso</h2>
                                <p className="text-sm text-slate-500">{selectedPatient.name} - {selectedPatient.goal}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500">Meta</p>
                                <p className="text-lg font-semibold text-purple-600">{selectedPatient.goal}</p>
                            </div>
                        </div>
                        {weightData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350}>
                                <AreaChart data={weightData}>
                                    <defs>
                                        <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#64748b"
                                        style={{ fontSize: '11px' }}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        style={{ fontSize: '12px' }}
                                        domain={['dataMin - 2', 'dataMax + 2']}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="peso"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fill="url(#colorPeso)"
                                        name="Peso (kg)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                <p>Sem dados de peso para o periodo selecionado</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Informacoes do Paciente</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Idade</span>
                                    <span className="font-semibold text-slate-800">{selectedPatient.age} anos</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Altura</span>
                                    <span className="font-semibold text-slate-800">{selectedPatient.height} cm</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Objetivo</span>
                                    <span className="font-semibold text-purple-600">{selectedPatient.goal}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-semibold text-slate-800 mb-4">Progresso</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Peso Inicial</span>
                                    <span className="font-semibold text-slate-800">
                                        {weightData.length > 0 ? weightData[0].peso : selectedPatient.weight} kg
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-600">Peso Atual</span>
                                    <span className="font-semibold text-slate-800">{selectedPatient.weight} kg</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                                    <span className="text-purple-700 font-medium">Total de Mudanca</span>
                                    <span className="font-bold text-purple-900">
                                        {weightChange > 0 ? '+' : ''}{calculateWeightChange()} kg
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
