import './globals.css';
import { Nunito } from 'next/font/google';
import CookieBanner from './components/CookieBanner'; 

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'LifeLytix',
  description: 'Personalized AI-Powered Health Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <CookieBanner /> {/* Cookie consent banner */}
        {children}
      </body>
    </html>
  );
}
