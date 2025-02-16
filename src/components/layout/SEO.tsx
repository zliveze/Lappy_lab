import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function SEO({
  title = 'Cursor ID Generator - Next Generation',
  description = 'Công cụ chỉnh sửa ID cho Cursor IDE và các IDE AI khác. Giải pháp tối ưu cho việc quản lý và sửa lỗi liên quan đến định danh trong ứng dụng Cursor IDE.',
  keywords = 'cursor ide, id generator, cursor id, windsurf ai, google play game beta, aide, ide ai, cursor id generator',
  ogImage = 'https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg',
  ogUrl = 'https://lappy-lab.vercel.app',
}: SEOProps) {
  const fullTitle = `${title} | LappyHacking`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={ogUrl} />
    </Head>
  );
} 