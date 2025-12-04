import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-cream-50">
            <Sidebar />
            <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
