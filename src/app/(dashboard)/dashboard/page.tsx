'use client';

import { Users, Utensils, AlertCircle, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { usePatients } from '@/hooks/usePatients';

export default function DashboardPage() {
    const router = useRouter();
    const { patients } = usePatients();
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

    const patientCount = patients.length;
    const dietCount = 15; // Mock count

    // Calculate nutritional alerts based on patient data
    const getNutritionalAlerts = () => {
        let alerts = 0;
        patients.forEach(patient => {
            const bmi = patient.weight / ((patient.height / 100) ** 2);
            // Alert if BMI is outside healthy range (18.5-24.9)
            if (bmi < 18.5 || bmi > 24.9) alerts++;
            // Alert if weight history shows rapid changes
            if (patient.history.length >= 2) {
                const recentChange = Math.abs(patient.history[patient.history.length - 1].weight - patient.history[patient.history.length - 2].weight);
                if (recentChange > 3) alerts++; // More than 3kg change in a month
            }
        });
        return alerts;
    };

    const calculateAverageWeightLoss = () => {
        let totalChange = 0;
        let count = 0;
        patients.forEach(patient => {
            if (patient.history.length >= 2) {
                const change = patient.history[0].weight - patient.history[patient.history.length - 1].weight;
                totalChange += change;
                count++;
            }
        });
        return count > 0 ? (totalChange / count).toFixed(1) : '0.0';
    };

    const stats = [
        {
            label: 'Pacientes Ativos',
            value: patientCount,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            trend: `${patientCount} cadastrados`
        },
        {
            label: 'Dietas Geradas',
            value: dietCount,
            icon: Utensils,
            color: 'text-green-600',
            bg: 'bg-green-100',
            trend: '+5% este mes'
        },
        {
            label: 'Alertas Nutricionais',
            value: getNutritionalAlerts(),
            icon: AlertCircle,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
            trend: 'IMC fora do ideal ou mudanca rapida'
        },
        {
            label: 'Media de Evolucao',
            value: `${calculateAverageWeightLoss()}kg`,
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
            trend: 'Media dos pacientes'
        }
    ];

    const patient = selectedPatient !== null ? patients[selectedPatient] : null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-2">Bem-vindo de volta, Dr. Nutri.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                            <p className="text-sm text-slate-500">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Proximas Consultas</h2>
                    <div className="space-y-4">
                        {patients.slice(0, 3).map((p, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium">
                                    {p.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-slate-800">{p.name}</h4>
                                    <p className="text-sm text-slate-500">Retorno - 14:00</p>
                                </div>
                                <button
                                    onClick={() => setSelectedPatient(i)}
                                    className="text-sm text-green-600 font-medium hover:underline"
                                >
                                    Ver ficha
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Atalhos Rapidos</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => router.push('/diet-generator')}
                            className="p-4 rounded-lg border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all text-left group"
                        >
                            <Utensils className="w-6 h-6 text-slate-400 group-hover:text-green-600 mb-2" />
                            <span className="block font-medium text-slate-700 group-hover:text-green-700">Nova Dieta</span>
                        </button>
                        <button
                            onClick={() => router.push('/patients')}
                            className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                        >
                            <Users className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-2" />
                            <span className="block font-medium text-slate-700 group-hover:text-blue-700">Novo Paciente</span>
                        </button>
                    </div>
                </div>
            </div>

            {getNutritionalAlerts() > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-orange-900 mb-2">Alertas Nutricionais Detectados</h3>
                            <p className="text-sm text-orange-800">
                                {getNutritionalAlerts()} paciente(s) com IMC fora da faixa ideal (18.5-24.9) ou mudanca de peso rapida (&gt;3kg/mes).
                                Recomenda-se revisar os planos alimentares e acompanhamento.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                isOpen={patient !== null}
                onClose={() => setSelectedPatient(null)}
                title={`Ficha de ${patient?.name}`}
            >
                {patient && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Idade</p>
                                <p className="text-lg font-semibold">{patient.age} anos</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Peso Atual</p>
                                <p className="text-lg font-semibold">{patient.weight} kg</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Altura</p>
                                <p className="text-lg font-semibold">{patient.height} cm</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">IMC</p>
                                <p className="text-lg font-semibold">
                                    {(patient.weight / ((patient.height / 100) ** 2)).toFixed(1)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Objetivo</p>
                                <p className="text-lg font-semibold">{patient.goal}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-2">Historico de Peso</p>
                            <div className="space-y-2">
                                {patient.history.map((entry, i) => (
                                    <div key={i} className="flex justify-between p-2 bg-slate-50 rounded">
                                        <span>{entry.date}</span>
                                        <span className="font-semibold">{entry.weight} kg</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
