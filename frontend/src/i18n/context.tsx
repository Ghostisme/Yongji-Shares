'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import zh from './messages/zh';
import en from './messages/en';
import type { Messages } from './messages/zh';

export type Locale = 'zh' | 'en';

const MESSAGES: Record<Locale, Messages> = { zh, en };
const LOCALE_KEY = 'app_locale';
const DEFAULT_LOCALE: Locale = 'zh';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolve(obj: unknown, path: string): string | undefined {
  let current = obj as Record<string, unknown>;
  for (const segment of path.split('.')) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[segment] as Record<string, unknown>;
  }
  return typeof current === 'string' ? current : undefined;
}

function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, name) => {
    const value = params[name];
    return value !== undefined ? String(value) : `{${name}}`;
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleRaw] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (saved === 'zh' || saved === 'en') {
      setLocaleRaw(saved);
      document.documentElement.lang = saved === 'zh' ? 'zh-CN' : 'en';
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleRaw(next);
    localStorage.setItem(LOCALE_KEY, next);
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = resolve(MESSAGES[locale], key);
      if (value === undefined) return key;
      return interpolate(value, params);
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}
