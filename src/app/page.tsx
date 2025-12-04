import Link from 'next/link';
import { Utensils, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <header className="container mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
                    <Utensils className="w-8 h-8" />
                    EsfomIAdo
                </div>
                <Link
                    href="/login"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                    Entrar
                </Link>
            </header>

            <main className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                            Nutricao Inteligente com <span className="text-green-500">IA</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Otimize seu tempo e entregue dietas personalizadas em segundos.
                            A plataforma definitiva para nutricionistas modernos.
                        </p>

                        <div className="space-y-4">
                            {['Geracao de dietas automatica', 'Analise nutricional avancada', 'Gestao completa de pacientes'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-700">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="text-lg">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
                            >
                                Comecar Agora
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                        <div className="relative bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <Utensils className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Dieta Gerada</h3>
                                    <p className="text-sm text-slate-500">Ha 2 segundos</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                                <div className="h-4 bg-slate-100 rounded w-full"></div>
                                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                            </div>
                            <div className="mt-6 flex gap-2">
                                <div className="h-8 bg-green-500 rounded-lg w-1/3"></div>
                                <div className="h-8 bg-slate-100 rounded-lg w-1/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
