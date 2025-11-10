import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      
      {/* Sidebar - Fixed width and takes up full height */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
      
    </div>
  );
}