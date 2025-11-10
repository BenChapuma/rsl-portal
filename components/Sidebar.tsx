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
      
      {/* Brand Logo Area */}
      <div className="p-4 border-b border-border flex items-center justify-center h-20">
        {/* Placeholder for Rydberg Starck Logo (assuming rs-logo.png in public) */}
        <Image
          src="/Rydberg-Starck-Logo.png" // Ensure this path matches your logo file in /public
          alt="Rydberg Starck Logo"
          width={200} // Adjust size as needed
          height={50} // Adjust size as needed
          priority
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            // FIX: Removed legacyBehavior and passHref. Link now wraps the Button directly.
            <Link 
              key={item.name} 
              href={item.href} 
              className="block w-full" // Added 'block w-full' to make the Link container fill the space
            >
              {/* Button is now the direct child of Link */}
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start font-sans font-normal transition-colors duration-200
                  ${isActive 
                    // Active link uses primary color (Dark Teal)
                    ? 'bg-primary text-primary-foreground hover:bg-rs-teal-light' 
                    // Inactive link uses dark text (rs-dark) and hovers with a light teal accent
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