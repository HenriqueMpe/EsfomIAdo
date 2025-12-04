'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Utensils,
    FileText,
    RefreshCw,
    TrendingUp,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patients', label: 'Pacientes', icon: Users },
    { href: '/diet-generator', label: 'Gerador de Dietas', icon: Utensils },
    { href: '/diet-analysis', label: 'Analise de Dieta', icon: FileText },
    { href: '/substitutions', label: 'Substituicoes', icon: RefreshCw },
    { href: '/evolution', label: 'Evolucao', icon: TrendingUp },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-border h-screen flex flex-col fixed left-0 top-0 z-10">
            <div className="p-6 border-b border-border">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Utensils className="w-8 h-8" />
                    EsfomIAdo
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Nutricao Inteligente</p>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary-foreground"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sair
                </Link>
            </div>
        </aside>
    );
}
