import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blogafay - HassanRJ',
  description: 'Blogafay: A fully functional and dynamic blog website made with 💖 by HassanRJ.',
  keywords: [
    'Blogafay',
    'Premium Blog',
    'Dynamic Blog Website',
    'NextJS Blog',
    'Web Development',
    'HassanRJ',
    'Blog Website',
    'Tech Blog',
  ],
  openGraph: {
    title: 'Blogafay - Premium Blog',
    description: 'Blogafay: A fully functional and dynamic blog website made with 💖 by HassanRJ.',
    images: [
      {
        url: '/images/pic1.jpg', // Replace with the actual URL of your image
        width: 1200,
        height: 630,
        alt: 'Blogafay - Premium Blog by HassanRJ',
      },
    ],
    siteName: 'Blogafay',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content="Blogafay - Premium Blog" />
        <meta name="description" content="Blogafay: A fully functional and dynamic blog website made with 💖 by HassanRJ." />
        <meta name="keywords" content="Blogafay, Premium Blog, Dynamic Blog Website, NextJS Blog, Web Development, HassanRJ, Blog Website, Tech Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogafay.vercel.app" /> {/* Replace with your website URL */}
        <meta property="og:image" content="/images/pic1.jpg" /> {/* Replace with your image URL */}
        <meta property="og:description" content="A fully functional and dynamic blog website made with 💖 by HassanRJ." />
        <meta property="og:title" content="Blogafay - Premium Blog Website" />
        <meta property="og:site_name" content="Blogafay" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
