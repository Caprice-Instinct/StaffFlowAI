'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Job Requests', href: '/jobs' },
  { name: 'Candidates', href: '/candidates' },
  { name: 'Credentials', href: '/credentials' },
  { name: 'Workflows', href: '/workflows' },
  { name: 'Security', href: '/security' },
  { name: 'Reports', href: '/reports' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">StaffFlow AI</h1>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    asChild
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                  >
                    <Link href={item.href}>
                      {item.name}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Workforce Intelligence Platform
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
}
