import type { Metadata } from 'next';
import { I18nProvider } from '@/i18n';
import { ToastContainer } from '@/components/ui/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: '商品详情 - 电商平台 | Product Detail',
  description: '浏览我们精选的优质商品 | Browse our curated quality products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased text-gray-900 bg-white">
        <I18nProvider>
          {children}
          <ToastContainer />
        </I18nProvider>
      </body>
    </html>
  );
}
