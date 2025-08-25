"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Crown,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navigation = [
    { name: "Ana Sayfa", href: "/", icon: null },
    { name: "CV Oluştur", href: "/builder", icon: FileText },
    { name: "Şablonlar", href: "/templates", icon: null },
    { name: "Premium", href: "/premium", icon: Crown },
  ];

  // Window kontrolü için useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <header>
      <div className="header-content">
        {/* Sol Taraf: Logo + Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" className="logo">
            <div className="logo-icon">
              <FileText style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            </div>
            <span className="logo-text">CVerly</span>
          </Link>

          {/* Desktop Navigation - CSS ile gizle/göster */}
          <nav className="nav nav-hidden" style={{ display: isMobile ? 'none' : 'flex' }}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: isActive(item.href) ? '#2563eb' : '#64748b',
                    backgroundColor: isActive(item.href) ? '#f1f5f9' : 'transparent'
                  }}
                >
                  {Icon && <Icon style={{ width: '1rem', height: '1rem' }} />}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sağ Taraf */}
        <div className="nav-actions">
          {/* Desktop Auth Buttons */}
          <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '1rem' }}>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn btn-outline">
                  <LayoutDashboard style={{ width: '1rem', height: '1rem' }} />
                  Panelim
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  <LogOut style={{ width: '1rem', height: '1rem' }} />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="btn btn-outline">
                  <User style={{ width: '1rem', height: '1rem' }} />
                  Giriş Yap
                </button>
                <Link href="/builder" className="btn btn-primary">
                  Ücretsiz Başla
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            {isMobileMenuOpen ? (
              <X style={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && isMobile && (
        <div style={{
          padding: '1rem',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    color: isActive(item.href) ? '#2563eb' : '#64748b',
                    backgroundColor: isActive(item.href) ? '#f1f5f9' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {Icon && <Icon style={{ width: '1rem', height: '1rem' }} />}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  <LayoutDashboard style={{ width: '1rem', height: '1rem' }} />
                  Panelim
                </Link>
                <button onClick={handleLogout} className="btn btn-primary" style={{ width: '100%' }}>
                  <LogOut style={{ width: '1rem', height: '1rem' }} />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} className="btn btn-outline" style={{ width: '100%' }}>
                  <User style={{ width: '1rem', height: '1rem' }} />
                  Giriş Yap
                </button>
                <Link href="/builder" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                  Ücretsiz Başla
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;