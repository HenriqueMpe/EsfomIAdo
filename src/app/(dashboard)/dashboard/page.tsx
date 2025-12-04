'use client';

import { Users, Utensils, AlertCircle, TrendingUp, Leaf, Heart, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { usePatients } from '@/hooks/usePatients';

export default function DashboardPage() {
    const router = useRouter();
    const { patients } = usePatients();
    const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

    const patientCount = patients.length;
    const dietCount = 15;

    const getNutritionalAlerts = () => {
        let alerts = 0;
        patients.forEach(patient => {
            const bmi = patient.weight / ((patient.height / 100) ** 2);
            if (bmi < 18.5 || bmi > 24.9) alerts++;
            if (patient.history.length >= 2) {
                const recentChange = Math.abs(patient.history[patient.history.length - 1].weight - patient.history[patient.history.length - 2].weight);
                if (recentChange > 3) alerts++;
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
            color: 'sage',
            trend: `${patientCount} cadastrados`
        },
        {
            label: 'Dietas Geradas',
            value: dietCount,
            icon: Utensils,
            color: 'terracotta',
            trend: '+5% este mes'
        },
        {
            label: 'Alertas Nutricionais',
            value: getNutritionalAlerts(),
            icon: AlertCircle,
            color: 'cream',
            trend: 'IMC fora do ideal'
        },
        {
            label: 'Media de Evolucao',
            value: `${calculateAverageWeightLoss()}kg`,
            icon: TrendingUp,
            color: 'sage',
            trend: 'Media dos pacientes'
        }
    ];

    const patient = selectedPatient !== null ? patients[selectedPatient] : null;

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-charcoal-900 mb-2">Bem-vindo de volta!</h1>
                    <p className="text-lg text-charcoal-500">Aqui esta um resumo da sua pratica nutricional.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-soft border border-charcoal-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-sage-400 to-sage-500 rounded-xl flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-charcoal-500">Dr. Nutri</p>
                        <p className="text-xs text-charcoal-400">Nutricionista</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const colorClasses = {
                        sage: 'from-sage-50 to-sage-100 border-sage-200',
                        terracotta: 'from-terracotta-50 to-terracotta-100 border-terracotta-200',
                        cream: 'from-cream-50 to-cream-100 border-cream-200',
                    };
                    const iconClasses = {
                        sage: 'bg-sage-500',
                        terracotta: 'bg-terracotta-500',
                        cream: 'bg-cream-500',
                    };

                    return (
                        <div key={index} className={`stat-card bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} border-2`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 ${iconClasses[stat.color as keyof typeof iconClasses]} rounded-2xl flex items-center justify-center shadow-md`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-charcoal-500 bg-white/70 px-3 py-1 rounded-full">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-4xl font-heading font-bold text-charcoal-900 mb-1">{stat.value}</h3>
                            <p className="text-sm font-medium text-charcoal-600">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-gradient">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-sage-500 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-heading font-semibold text-charcoal-900">Proximas Consultas</h2>
                    </div>
                    <div className="space-y-3">
                        {patients.slice(0, 3).map((p, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all duration-200 cursor-pointer border border-transparent hover:border-sage-200">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta-300 to-terracotta-400 flex items-center justify-center text-white font-heading font-bold text-lg shadow-sm">
                                    {p.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-charcoal-800">{p.name}</h4>
                                    <p className="text-sm text-charcoal-500">Retorno - 14:00</p>
                                </div>
                                <button
                                    onClick={() => setSelectedPatient(i)}
                                    className="text-sm text-sage-600 font-semibold hover:text-sage-700 transition-colors"
                                >
                                    Ver ficha ?
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-gradient">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-terracotta-500 rounded-xl flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-heading font-semibold text-charcoal-900">Atalhos Rapidos</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => router.push('/diet-generator')}
                            className="p-6 rounded-2xl border-2 border-sage-200 hover:border-sage-400 hover:bg-sage-50 transition-all duration-200 text-left group"
                        >
                            <Utensils className="w-8 h-8 text-sage-400 group-hover:text-sage-600 mb-3 transition-colors" />
                            <span className="block font-heading font-semibold text-charcoal-800 group-hover:text-sage-700">Nova Dieta</span>
                            <span className="block text-xs text-charcoal-500 mt-1">Gerar plano alimentar</span>
                        </button>
                        <button
                            onClick={() => router.push('/patients')}
                            className="p-6 rounded-2xl border-2 border-terracotta-200 hover:border-terracotta-400 hover:bg-terracotta-50 transition-all duration-200 text-left group"
                        >
                            <Users className="w-8 h-8 text-terracotta-400 group-hover:text-terracotta-600 mb-3 transition-colors" />
                            <span className="block font-heading font-semibold text-charcoal-800 group-hover:text-terracotta-700">Novo Paciente</span>
                            <span className="block text-xs text-charcoal-500 mt-1">Cadastrar paciente</span>
                        </button>
                    </div>
                </div>
            </div>

            {getNutritionalAlerts() > 0 && (
                <div className="bg-gradient-to-r from-terracotta-50 to-cream-50 border-2 border-terracotta-200 rounded-3xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-terracotta-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-terracotta-900 mb-2 text-lg">Alertas Nutricionais Detectados</h3>
                            <p className="text-charcoal-700 leading-relaxed">
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
                            <div className="bg-sage-50 p-4 rounded-2xl border border-sage-200">
                                <p className="text-sm text-charcoal-600 font-medium">Idade</p>
                                <p className="text-2xl font-heading font-bold text-charcoal-900">{patient.age} anos</p>
                            </div>
                            <div className="bg-terracotta-50 p-4 rounded-2xl border border-terracotta-200">
                                <p className="text-sm text-charcoal-600 font-medium">Peso Atual</p>
                                <p className="text-2xl font-heading font-bold text-charcoal-900">{patient.weight} kg</p>
                            </div>
                            <div className="bg-cream-50 p-4 rounded-2xl border border-cream-200">
                                <p className="text-sm text-charcoal-600 font-medium">Altura</p>
                                <p className="text-2xl font-heading font-bold text-charcoal-900">{patient.height} cm</p>
                            </div>
                            <div className="bg-sage-50 p-4 rounded-2xl border border-sage-200">
                                <p className="text-sm text-charcoal-600 font-medium">IMC</p>
                                <p className="text-2xl font-heading font-bold text-charcoal-900">
                                    {(patient.weight / ((patient.height / 100) ** 2)).toFixed(1)}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-sage-50 to-cream-50 p-4 rounded-2xl border border-sage-200">
                            <p className="text-sm text-charcoal-600 font-semibold mb-2">Objetivo</p>
                            <p className="text-lg font-heading font-semibold text-sage-700">{patient.goal}</p>
                        </div>

                        <div>
                            <p className="text-sm text-charcoal-600 font-semibold mb-3">Historico de Peso</p>
                            <div className="space-y-2">
                                {patient.history.map((entry, i) => (
                                    <div key={i} className="flex justify-between p-3 bg-cream-50 rounded-xl border border-cream-200">
                                        <span className="text-charcoal-600">{entry.date}</span>
                                        <span className="font-heading font-bold text-charcoal-900">{entry.weight} kg</span>
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
