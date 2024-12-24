import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon: LucideIcon;
}

export default function NavLink({ to, children, icon: Icon }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center px-1 pt-1 text-sm font-medium',
        isActive
          ? 'border-b-2 border-blue-500 text-gray-900'
          : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      )}
    >
      <Icon className="h-4 w-4 mr-2" />
      {children}
    </Link>
  );
}