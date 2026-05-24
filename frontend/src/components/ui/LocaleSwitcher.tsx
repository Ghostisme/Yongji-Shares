'use client';

import { useI18n, type Locale } from '@/i18n';

const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'EN' },
];

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5">
      {LOCALE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLocale(opt.value)}
          className={`
            px-2.5 py-1 text-xs font-medium rounded-md transition-all
            ${locale === opt.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
