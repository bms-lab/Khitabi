import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { CONFIG } from '../config';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="مسار التنقل" className="flex items-center text-xs text-stone-600 dark:text-stone-400 mb-6 overflow-x-auto py-1">
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronLeft className="w-3 h-3 text-stone-600 dark:text-stone-400" />
              {isLast || !item.url ? (
                <span className="font-semibold text-stone-900 dark:text-stone-200" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${CONFIG.SITE_URL}${item.url}`,
    })),
  };
}
