import type { Metadata } from 'next';
import { ToastContainer } from '@/components/ui/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: '商品详情 - 电商平台',
  description: '浏览我们精选的优质商品',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased text-gray-900 bg-white">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
