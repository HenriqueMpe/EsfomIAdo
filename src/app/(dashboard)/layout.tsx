import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-cream-50">
            <Sidebar />
            <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 p-4 lg:p-8 max-w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
