// app/page.tsx
"use client"

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Download, 
  Palette, 
  Zap, 
  Star,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Kolay CV Oluşturma',
      description: 'Adım adım rehber eşliğinde dakikalar içinde profesyonel CV oluşturun.'
    },
    {
      icon: Palette,
      title: 'Modern Şablonlar',
      description: 'Sektörünüze uygun, göz alıcı ve modern CV şablonları arasından seçim yapın.'
    },
    {
      icon: Download,
      title: 'PDF İndirme',
      description: 'CV\'nizi yüksek kalitede PDF formatında anında indirin.'
    },
    {
      icon: Zap,
      title: 'Hızlı ve Güvenli',
      description: 'Verileriniz güvende kalır, CV\'nizi saniyeler içinde oluşturun.'
    }
  ];

  const stats = [
    { number: '250K+', label: 'Mutlu Kullanıcı' },
    { number: '15+', label: 'Profesyonel Şablon' },
    { number: '%73', label: 'Başarı Oranı' },
    { number: '5 Dk', label: 'Ortalama Süre' }
  ];

  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Yazılım Geliştirici',
      content: 'CVerly sayesinde çok profesyonel bir CV oluşturdum. İş başvurularımda çok olumlu geri dönüşler aldım.',
      rating: 5
    },
    {
      name: 'Merve Demir',
      role: 'Pazarlama Uzmanı',
      content: 'Şablonlar gerçekten çok güzel ve kullanımı çok kolay. Herkese tavsiye ederim.',
      rating: 5
    },
    {
      name: 'Can Özkan',
      role: 'Grafik Tasarımcı',
      content: 'Kreatif şablonlar sayesinde portföyümü çok güzel bir şekilde sunabiliyorum.',
      rating: 5
    }
  ];

  const benefits = [
    { 
      title: 'Profesyonel Tasarım', 
      desc: 'Modern ve göz alıcı şablonlarla rakiplerinizden sıyrılın.' 
    },
    { 
      title: 'Kolay Kullanım', 
      desc: 'Teknik bilgi gerektirmez, herkes kolayca kullanabilir.' 
    },
    { 
      title: 'Hızlı Sonuç', 
      desc: '5 dakikada profesyonel CV\'niz hazır.' 
    },
    { 
      title: 'Ücretsiz Başlangıç', 
      desc: 'Kredi kartı gerektirmez, hemen başlayabilirsiniz.' 
    }
  ];

  const faqs = [
    { 
      q: 'CVerly gerçekten ücretsiz mi?', 
      a: 'Evet! Temel özellikler tamamen ücretsiz. Premium şablonlar ve gelişmiş özellikler için uygun fiyatlı planlarımız var.' 
    },
    { 
      q: 'PDF kalitesi nasıl?', 
      a: 'Yüksek çözünürlüklü PDF çıktısı alırsınız. İş başvurularında ve yazdırmada mükemmel sonuçlar elde edersiniz.' 
    },
    { 
      q: 'Verilerim güvende mi?', 
      a: 'Evet! Verileriniz sadece tarayıcınızda saklanır, sunucularımızda tutulmaz. Gizliliğiniz bizim için çok önemli.' 
    },
    { 
      q: 'Kaç CV oluşturabilirim?', 
      a: 'Ücretsiz hesapla 3 CV oluşturabilirsiniz. Premium ile sınırsız CV oluşturma hakkına sahip olursunuz.' 
    }
  ];

  return (
    <div>
      {/* Modern Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.3
        }} />
        
        {/* Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          animation: 'float 6s ease-in-out infinite'
        }}>💼</div>
        
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          animation: 'float 6s ease-in-out infinite 2s'
        }}>📊</div>
        
        <div style={{
          position: 'absolute',
          top: '80%',
          right: '5%',
          width: '70px',
          height: '70px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          animation: 'float 6s ease-in-out infinite 4s'
        }}>🎯</div>

        <div className="container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4rem',
            minHeight: '80vh'
          }}>
            {/* Left Content */}
            <div style={{ flex: 1, maxWidth: '600px' }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(10px)'
              }}>
                ✨ Türkiye'nin #1 CV Oluşturma Platformu
              </div>
              
              {/* Main Title */}
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Hayalinizdeki İşe Bir Adım Daha Yakın!
              </h1>
              
              {/* Subtitle */}
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
                opacity: 0.9,
                maxWidth: '500px'
              }}>
                Profesyonel CV'niz ile iş görüşmelerine çağrılma şansınızı %73 artırın. 
                Dakikalar içinde etkileyici CV'nizi oluşturun.
              </p>
              
              {/* CTA Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '2.5rem',
                flexWrap: 'wrap'
              }}>
                <Link href="/templates" style={{
                  padding: '14px 32px',
                  background: 'white',
                  color: '#667eea',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}>
                  📄 Hemen CV Oluştur
                </Link>
                
                <Link href="/templates">
                  <button style={{
                    padding: '14px 32px',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid white',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    Şablonları İncele
                    <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                  </button>
                </Link>
              </div>
              
              {/* Stats */}
              <div style={{ 
                display: 'flex', 
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                {stats.map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '2rem', 
                      fontWeight: 'bold',
                      marginBottom: '0.25rem'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      opacity: 0.8 
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Visual */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* CV Mockup */}
              <div style={{
                width: '300px',
                height: '400px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                transform: 'rotate(3deg)',
                transition: 'transform 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(3deg) scale(1)';
              }}>
                {/* CV Header */}
                <div style={{
                  background: '#3b82f6',
                  height: '120px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>👤</div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>BERAT ERGÜN</div>
                  <div style={{ fontSize: '10px', opacity: 0.9 }}>Software Engineer</div>
                </div>
                
                {/* CV Content */}
                <div style={{ padding: '20px', color: '#374151' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#3b82f6',
                      marginBottom: '8px',
                      borderBottom: '1px solid #e5e7eb',
                      paddingBottom: '4px'
                    }}>DENEYIM</div>
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '90%' }} />
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '70%' }} />
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '100%' }} />
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#3b82f6',
                      marginBottom: '8px',
                      borderBottom: '1px solid #e5e7eb',
                      paddingBottom: '4px'
                    }}>EĞİTİM</div>
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '100%' }} />
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '90%' }} />
                  </div>
                  
                  <div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#3b82f6',
                      marginBottom: '8px',
                      borderBottom: '1px solid #e5e7eb',
                      paddingBottom: '4px'
                    }}>YETENEKLER</div>
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '70%' }} />
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '90%' }} />
                    <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '4px', width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add keyframes animation */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden CVerly?
            </h2>
            <p className="text-xl text-gray-600">
              CV oluşturma sürecini basitleştiren özelliklerimiz ile 
              profesyonel sonuçlar elde edin.
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nasıl Çalışır?
            </h2>
            <p className="text-xl text-gray-600">
              3 basit adımda profesyonel CV'niz hazır!
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ marginTop: '3rem' }}>
            {[
              {
                step: 1,
                title: 'Bilgilerinizi Girin',
                desc: 'Kişisel bilgilerinizi, iş deneyimlerinizi ve eğitim geçmişinizi ekleyin.'
              },
              {
                step: 2,
                title: 'Şablon Seçin',
                desc: 'Sektörünüze uygun modern ve profesyonel şablonlar arasından seçim yapın.'
              },
              {
                step: 3,
                title: 'İndirin',
                desc: 'CV\'nizi PDF formatında indirin ve iş başvurularınızda kullanın.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  background: '#2563eb', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kullanıcılarımız Ne Diyor?
            </h2>
            <p className="text-xl text-gray-600">
              Binlerce kullanıcımızın deneyimleri
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ marginTop: '3rem' }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card" style={{ margin: '0 1rem' }}>
                <div className="card-content">
                  <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        style={{ 
                          width: '1.25rem', 
                          height: '1.25rem', 
                          color: '#fbbf24', 
                          fill: '#fbbf24' 
                        }} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Neden Binlerce Kişi CVerly'i Tercih Ediyor?
              </h2>
              <div className="space-y-4">
                {benefits.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <CheckCircle style={{ 
                      width: '1.5rem', 
                      height: '1.5rem', 
                      color: '#059669', 
                      flexShrink: 0, 
                      marginTop: '0.125rem' 
                    }} />
                    <div>
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              borderRadius: '1rem',
              padding: '3rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3 className="text-2xl font-bold mb-4">Hemen Başlayın!</h3>
              <p className="mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Profesyonel CV'nizi oluşturmak için sadece birkaç dakika ayırın.
              </p>
              <Link href="/templates" className="btn btn-lg" style={{ background: 'white', color: '#667eea' }}>
                <FileText style={{ width: '1.25rem', height: '1.25rem' }} />
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600">
              Merak ettiklerinizin cevapları
            </p>
          </div>

          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <h4 className="font-semibold mb-2">{faq.q}</h4>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Hayalinizdeki İşe Bir Adım Daha Yakın!
          </h2>
          <p className="text-xl mb-8" style={{ color: '#bfdbfe', maxWidth: '32rem', margin: '0 auto 2rem' }}>
            Profesyonel CV'niz ile iş görüşmelerine çağrılma şansınızı %73 artırın.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/templates" className="btn btn-lg" style={{ background: 'white', color: '#2563eb' }}>
              <FileText style={{ width: '1.25rem', height: '1.25rem' }} />
              Hemen CV Oluştur
            </Link>
            <Link href="/templates" className="btn btn-lg btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              Şablonları Gör
            </Link>
          </div>
          <p className="text-sm mt-4" style={{ color: '#bfdbfe' }}>
            ✨ Kredi kartı gerektirmez • 🚀 5 dakikada hazır • 💎 Profesyonel sonuç
          </p>
        </div>
      </section>
    </div>
  );
}