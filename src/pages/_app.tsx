import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';

// Component đơn giản cho thanh tiến trình tải trang
const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() =>{ setLoading(false) }, 300); // Thêm delay nhỏ

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete); // Dừng loading khi có lỗi

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]); // Thêm router.events vào dependencies

  return (
    <>
      {loading && <PageLoader />}
      <Component {...pageProps} />
    </>
  );
}
