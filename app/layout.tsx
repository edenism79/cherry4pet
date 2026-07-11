import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#E9415A',
}

export const metadata: Metadata = {
  title: "CHERRY for PET | 반려동물을 위한 투명한 기부 플랫폼",
  description: "사진 한 장, 작은 참여, 투명한 기부가 반려동물의 생명을 지킵니다.",
  keywords: "반려동물, 기부, 투명한 기부, 동물 구조, 유기동물, CHERRY, 동물 보호",
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'CHERRY for PET',
    title: "CHERRY for PET | 반려동물을 위한 투명한 기부 플랫폼",
    description: "사진 한 장, 작은 참여, 투명한 기부가 반려동물의 생명을 지킵니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Noto+Serif+KR:wght@400;700;900&family=Nanum+Gothic:wght@400;700;800&family=Nanum+Myeongjo:wght@400;700;800&family=Gothic+A1:wght@400;700;900&family=Black+Han+Sans&family=Jua&family=Do+Hyeon&family=Gowun+Batang:wght@400;700&family=Gowun+Dodum&family=Cute+Font&family=Gaegu:wght@400;700&family=Gamja+Flower&family=Sunflower:wght@500;700&family=Stylish&family=Poor+Story&family=Single+Day&family=Yeon+Sung&family=Hi+Melody&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
