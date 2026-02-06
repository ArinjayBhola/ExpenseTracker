import Sidebar from "../_components/Sidebar";
import Header from "../_components/Header";
import { UserGuide } from "../_components/UserGuide";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar: Responsive width */}
      <aside className="w-80 hidden md:block flex-shrink-0">
        <Sidebar />
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        <Header />
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {children}
        </div>
        <UserGuide />
      </main>
    </div>
  );
}
