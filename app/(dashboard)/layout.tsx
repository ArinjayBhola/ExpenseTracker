import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { UserGuide } from "../_components/UserGuide";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar: Responsive width */}
      <aside className="hidden md:block flex-shrink-0 h-full relative z-50">
        <Sidebar />
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {children}
        </div>
        <UserGuide />
      </main>
    </div>
  );
}
