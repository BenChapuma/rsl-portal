'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Employees', href: '/employees' },
  { name: 'Recruitment', href: '/recruitment' },
  { name: 'Time Off', href: '/time-off' },
  { name: 'Payroll', href: '/payroll' },
];

export function Sidebar() {
  const pathname = usePathname();

  // Base classes ensure uniform width, font, transition, shadow, border thickness (border-2)
  const baseButtonClasses = "w-full justify-start font-sans font-normal transition-all duration-200 shadow-md border-2";

  return (
    <div className="flex flex-col h-full w-64 border-r border-border bg-white shadow-md">
      
      {/* Brand Logo Area */}
      <div className="p-2 border-b border-border flex items-center justify-center h-32">
        <Image
          src="/rs-logo.png" 
          alt="Rydberg Starck Logo"
          width={220} 
          height={100} 
          priority
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          // Dynamically determine the class based on active status
          const linkClasses = isActive
            // ACTIVE STATE: Dark Teal background, Dark Teal border, White text
            ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
            // INACTIVE STATE: Solid light primary color fill, Light border, White text
            : 'bg-primary/50 text-primary-foreground border-primary/40 hover:bg-primary/60';

          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="block w-full"
            >
              <Button
                // We must use 'default' variant to maintain the full button structure
                variant="default"
                className={`${baseButtonClasses} ${linkClasses}`}
              >
                <span className="ml-3">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Brand Footer */}
      <div className="p-4 text-center text-xs text-rs-dark/60 border-t border-border">
        <p>Rydberg Starck HRMS</p>
        <p className="font-heading italic">Infinite Possibilities</p>
      </div>
    </div>
  );
}