// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
// AuthProvider'ı import et
import AuthProvider from '@/components/providers/AuthProvider';
// SettingsProvider'ı import et
import { SettingsProvider } from '@/app/contexts/SettingsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CVerly - Profesyonel CV Oluşturucu',
  description: 'Modern şablonlarla dakikalar içinde profesyonel CV oluşturun. Ücretsiz CV yapıcı ve PDF indirme.',
  keywords: 'cv oluşturucu, özgeçmiş, resume builder, cv maker, ücretsiz cv',
  authors: [{ name: 'CVerly' }],
  creator: 'CVerly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SettingsProvider>
          <AuthProvider>
            <div className="min-h-screen">
              <Header />
              <main>{children}</main>
              <footer style={{
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border-light)',
                padding: '2rem 0',
                marginTop: '4rem',
                transition: 'all 0.3s ease'
              }}>
                <div className="container">
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      &copy; 2025 CVerly. Tüm hakları saklıdır.
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '2rem',
                      fontSize: '0.875rem'
                    }}>
                      <a href="/privacy" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}>
                        Gizlilik Politikası
                      </a>
                      <a href="/terms" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}>
                        Kullanım Şartları
                      </a>
                      <a href="/contact" style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}>
                        İletişim
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}