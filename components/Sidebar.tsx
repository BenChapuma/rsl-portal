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

  return (
    <div className="flex flex-col h-full w-64 border-r border-border bg-white shadow-md">
      
      {/* Brand Logo Area - FIXED: Increased height to h-32 and adjusted image dimensions */}
      {/* h-32 provides 8rem (128px) of vertical space, which should be sufficient */}
      <div className="p-2 border-b border-border flex items-center justify-center h-32">
        <Image
          src="/rs-logo.png" 
          alt="Rydberg Starck Logo"
          width={220} 
          height={100} // Increased height to utilize the new container space
          priority
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="block w-full"
            >
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start font-sans font-normal transition-colors duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground hover:bg-rs-teal-light' 
                    : 'text-rs-dark hover:bg-rs-teal-light/20'
                  }`
                }
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