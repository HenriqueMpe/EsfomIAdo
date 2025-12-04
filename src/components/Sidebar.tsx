'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, Utensils, BarChart3, RefreshCw, TrendingUp, Leaf, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '/patients', label: 'Pacientes', icon: Users },
        { href: '/diet-generator', label: 'Gerar Dieta', icon: Utensils },
        { href: '/diet-analysis', label: 'Analisar Dieta', icon: BarChart3 },
        { href: '/substitutions', label: 'Substituicoes', icon: RefreshCw },
        { href: '/evolution', label: 'Evolucao', icon: TrendingUp },
    ];

    const handleLogout = () => {
        router.push('/login');
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-sage-600 text-white rounded-xl shadow-lg flex items-center justify-center"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed left-0 top-0 w-72 min-h-screen bg-gradient-to-b from-sage-700 to-sage-800 text-white p-6 shadow-soft-lg z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-terracotta-400 to-terracotta-500 rounded-2xl flex items-center justify-center shadow-md">
                            <Leaf className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-white">EsfomIAdo</h1>
                            <p className="text-sage-200 text-sm font-medium">Nutricao Inteligente</p>
                        </div>
                    </div>
                </div>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeSidebar}
                                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-200
                  ${isActive
                                        ? 'bg-white text-sage-700 shadow-md'
                                        : 'text-sage-100 hover:bg-sage-600/50 hover:text-white'
                                    }
                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-sage-600' : ''}`} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-sage-600/30 backdrop-blur-sm rounded-2xl p-4 border border-sage-500/30">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cream-300 to-cream-400 rounded-full flex items-center justify-center text-sage-800 font-bold text-lg">
                                N
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-white text-sm">Dr. Nutri</p>
                                <p className="text-sage-200 text-xs">Nutricionista</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sage-500/50 hover:bg-sage-500 text-white rounded-xl transition-all duration-200 text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Sair
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
