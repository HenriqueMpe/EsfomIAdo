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
                        <div className="absolute -inset-4 bg-gradient-to-r from-sage-400 to-terracotta-400 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
                        <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-2 border-sage-200 hover:border-sage-400 transition-all duration-500 hover:scale-105">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-sage-100">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage-500 to-sage-600 flex items-center justify-center shadow-lg">
                                    <Utensils className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-charcoal-900 text-lg">Dieta Personalizada</h3>
                                    <p className="text-sm text-sage-600 font-medium">Gerada com IA em segundos</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-sage-500 mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-charcoal-700 font-medium mb-1">Cafe da Manha (7h)</p>
                                        <p className="text-xs text-charcoal-500">2 ovos mexidos + 2 fatias de pao integral</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-terracotta-500 mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-charcoal-700 font-medium mb-1">Almoco (12h)</p>
                                        <p className="text-xs text-charcoal-500">150g frango grelhado + arroz integral + salada</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-cream-500 mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-charcoal-700 font-medium mb-1">Jantar (19h)</p>
                                        <p className="text-xs text-charcoal-500">Peixe assado + batata doce + legumes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t-2 border-sage-100 flex gap-3">
                                <div className="flex-1 h-10 bg-gradient-to-r from-sage-500 to-sage-600 rounded-xl shadow-md flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">Gerar Dieta</span>
                                </div>
                                <div className="flex-1 h-10 bg-cream-100 rounded-xl flex items-center justify-center">
                                    <span className="text-charcoal-600 font-medium text-sm">Exportar PDF</span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-sage-600">
                                <div className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">IA processando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
