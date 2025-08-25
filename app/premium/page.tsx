// app/premium/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouter'ı import ediyoruz
import { 
  Crown, 
  Check, 
  X, 
  FileText, 
  Palette, 
  Download, 
  Shield, 
  Zap,
  Users,
  BarChart3,
  Mail,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Fonksiyonel bileşeni tanımlarken, type'ları belirtmek best practice'dir.
type PlanType = 'monthly' | 'yearly';

const PremiumPage = () => {
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const router = useRouter(); // useRouter hook'unu kullanıyoruz

  // Yönlendirme işlemini yapacak fonksiyon
  const handleUpgradeClick = () => {
    router.push('/pricing');
  };

  const features = [
    {
      icon: FileText,
      title: "Sınırsız CV Oluşturma",
      description: "İstediğiniz kadar CV oluşturun ve saklayın",
      free: false,
      premium: true
    },
    {
      icon: Palette,
      title: "Premium Şablonlar",
      description: "50+ özel tasarlanmış profesyonel şablon",
      free: false,
      premium: true
    },
    {
      icon: Download,
      title: "Çoklu Format İndir",
      description: "PDF, Word, PNG formatlarında indirin",
      free: "Sadece PDF",
      premium: true
    },
    {
      icon: BarChart3,
      title: "Detaylı Analitik",
      description: "CV performansınızı takip edin",
      free: false,
      premium: true
    },
    {
      icon: Shield,
      title: "Öncelikli Destek",
      description: "24/7 öncelikli müşteri desteği",
      free: false,
      premium: true
    },
    {
      icon: Zap,
      title: "AI CV Optimizasyonu",
      description: "AI ile CV'nizi optimize edin",
      free: false,
      premium: true
    }
  ];

  const plans = [
    {
      name: "Ücretsiz",
      price: 0, // Fiyatı number olarak belirledik
      period: "ay",
      description: "Başlamak için ideal",
      features: [
        "1 CV oluşturma",
        "3 temel şablon",
        "PDF indirme",
        "Temel düzenleme",
        "Topluluk desteği"
      ],
      popular: false,
      buttonText: "Mevcut Plan",
      buttonStyle: "btn-outline"
    },
    {
      name: "Premium",
      price: isYearly ? 199 : 29,
      period: isYearly ? "yıl" : "ay",
      originalPrice: isYearly ? 348 : null, // Orijinal fiyatı number olarak belirledik
      description: "Profesyoneller için",
      features: [
        "Sınırsız CV oluşturma",
        "50+ premium şablon", 
        "Tüm formatlar (PDF, Word, PNG)",
        "AI CV optimizasyonu",
        "Detaylı analitik",
        "Öncelikli destek",
        "Özel tasarım araçları",
        "CV performans takibi"
      ],
      popular: true,
      buttonText: "Premium'a Geç",
      buttonStyle: "btn-primary",
      savings: isYearly ? "43%" : null
    }
  ];

  const testimonials = [
    {
      name: "Ahmet Kaya",
      role: "Yazılım Geliştirici",
      content: "Premium şablonlar sayesinde dream job'uma kavuştum. AI optimizasyon özelliği muhteşem!",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Zeynep Demir", 
      role: "Pazarlama Uzmanı",
      content: "Analitik özelliği ile CV'min performansını takip edebiliyorum. Çok profesyonel!",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Mehmet Özkan",
      role: "Proje Yöneticisi", 
      content: "Öncelikli destek sayesinde tüm sorularım hızla çözülüyor. Kesinlikle tavsiye ederim.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    }
  ];

  const faqs = [
    {
      question: "Premium üyelik nasıl iptal edilir?",
      answer: "Hesap ayarlarından istediğiniz zaman tek tıkla iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar premium özellikler aktif kalır."
    },
    {
      question: "Ödeme güvenli mi?",
      answer: "Evet, tüm ödemeler SSL şifrelemesi ve güvenilir ödeme sağlayıcıları ile korunmaktadır."
    },
    {
      question: "Ücretsiz sürümden premium'a geçersem verilerim kaybolur mu?",
      answer: "Hayır, tüm CV'leriniz ve verileriniz korunur ve premium özelliklere hemen erişebilirsiniz."
    },
    {
      question: "Premium özelliklerle hangi avantajları elde ederim?",
      answer: "50+ özel şablon, sınırsız CV, AI optimizasyon, detaylı analitik, çoklu format indirme ve öncelikli destek."
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <Crown style={{ 
              width: '4rem', 
              height: '4rem', 
              margin: '0 auto 2rem',
              color: '#fbbf24'
            }} />
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Premium ile <br />
              <span style={{ color: '#fbbf24' }}>Kariyerinizi</span> Hızlandırın
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: 0.9, 
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              50+ özel şablon, AI optimizasyon ve gelişmiş özelliklerle 
              profesyonel CV'ler oluşturun. İlk 7 gün ücretsiz deneyin.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="#pricing" className="btn btn-lg" style={{ 
                backgroundColor: '#fbbf24', 
                color: '#1a202c',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                <Sparkles style={{ width: '1.25rem', height: '1.25rem' }} />
                7 Gün Ücretsiz Deneyin
              </Link>
              <Link href="/builder" className="btn btn-lg" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'white',
                border: '2px solid white',
                color: 'white',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}>
                Özellikleri Keşfet
              </Link>
            </div>
            <p style={{ 
              fontSize: '0.875rem', 
              opacity: 0.8, 
              marginTop: '1rem' 
            }}>
              💳 Kredi kartı gerekmez • ⏱️ 30 saniyede başlayın • 🔒 İstediğiniz zaman iptal edin
            </p>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section id="features" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="text-3xl font-bold text-gray-900" style={{ marginBottom: '1rem' }}>
              Neden Premium?
            </h2>
            <p className="text-lg text-gray-600">
              Premium özellikleri ile farkı yakalayın
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {features.map((feature, index: number) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card" style={{ 
                  padding: '2rem',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <Icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem',
                    color: '#1e293b'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    color: '#64748b', 
                    marginBottom: '1.5rem',
                    lineHeight: '1.5'
                  }}>
                    {feature.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Ücretsiz
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {typeof feature.free === 'string' ? (
                          <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>{feature.free}</span>
                        ) : feature.free ? (
                          <Check style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                        ) : (
                          <X style={{ width: '1rem', height: '1rem', color: '#ef4444' }} />
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Premium
                      </div>
                      <Check style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ 
        padding: '5rem 0',
        background: 'white'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="text-3xl font-bold text-gray-900" style={{ marginBottom: '1rem' }}>
              Basit ve Şeffaf Fiyatlandırma
            </h2>
            <p className="text-lg text-gray-600" style={{ marginBottom: '2rem' }}>
              İhtiyacınıza uygun planı seçin
            </p>
            
            {/* Billing Toggle */}
            <div style={{ 
              display: 'inline-flex', 
              background: '#f1f5f9', 
              borderRadius: '0.75rem',
              padding: '0.25rem'
            }}>
              <button
                onClick={() => setIsYearly(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: !isYearly ? 'white' : 'transparent',
                  color: !isYearly ? '#1e293b' : '#64748b',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: !isYearly ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Aylık
              </button>
              <button
                onClick={() => setIsYearly(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: isYearly ? 'white' : 'transparent',
                  color: isYearly ? '#1e293b' : '#64748b',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: isYearly ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  position: 'relative'
                }}
              >
                Yıllık
                {isYearly && (
                  <span style={{
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-0.5rem',
                    background: '#10b981',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontWeight: '600'
                  }}>
                    43% İndirim
                  </span>
                )}
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '2rem',
            maxWidth: '64rem',
            margin: '0 auto'
          }}>
            {plans.map((plan, index: number) => (
              <div key={index} className="card" style={{
                padding: '2.5rem',
                position: 'relative',
                border: plan.popular ? '2px solid #667eea' : '1px solid #e5e7eb',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                boxShadow: plan.popular ? '0 20px 40px rgba(102, 126, 234, 0.15)' : '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    En Popüler
                  </div>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '0.5rem',
                    color: '#1e293b'
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                    {plan.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
                    {plan.originalPrice && (
                      <span style={{
                        fontSize: '1.25rem',
                        color: '#9ca3af',
                        textDecoration: 'line-through'
                      }}>
                        ₺{plan.originalPrice}
                      </span>
                    )}
                    <span style={{ 
                      fontSize: '3rem', 
                      fontWeight: '800',
                      color: plan.popular ? '#667eea' : '#1e293b'
                    }}>
                      ₺{plan.price}
                    </span>
                    <span style={{ color: '#64748b' }}>
                      /{plan.period}
                    </span>
                  </div>
                  
                  {plan.savings && (
                    <div style={{
                      marginTop: '0.5rem',
                      color: '#10b981',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      🎉 {plan.savings} tasarruf edin!
                    </div>
                  )}
                </div>

                <ul style={{ 
                  marginBottom: '2rem',
                  paddingLeft: '0',
                  listStyle: 'none'
                }}>
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      marginBottom: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#374151'
                    }}>
                      <Check style={{ 
                        width: '1rem', 
                        height: '1rem', 
                        color: '#10b981',
                        flexShrink: 0
                      }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={handleUpgradeClick} // Yönlendirme fonksiyonunu buraya ekledik
                  className={`btn btn-lg ${plan.buttonStyle}`} 
                  style={{
                    width: '100%',
                    fontSize: '1rem',
                    fontWeight: '600',
                    // Stil düzenlemeleri
                    backgroundColor: plan.buttonStyle === 'btn-primary' ? '#667eea' : 'transparent',
                    color: plan.buttonStyle === 'btn-primary' ? 'white' : '#667eea',
                    border: plan.buttonStyle === 'btn-outline' ? '1px solid #667eea' : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  {plan.buttonText}
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 0', background: '#f9fafb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="text-3xl font-bold text-gray-900" style={{ marginBottom: '1rem' }}>
              Kullanıcılarımız Ne Diyor?
            </h2>
            <p className="text-lg text-gray-600">
              Binlerce kullanıcı CVerly Premium ile kariyerini ilerletti
            </p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {testimonials.map((testimonial, index: number) => (
              <div key={index} className="card" style={{ 
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '0.25rem',
                  marginBottom: '1rem'
                }}>
                  {[...Array(testimonial.rating)].map((_, i: number) => (
                    <Star key={i} style={{ 
                      width: '1rem', 
                      height: '1rem', 
                      fill: '#fbbf24', 
                      color: '#fbbf24' 
                    }} />
                  ))}
                </div>
                <p style={{ 
                  fontStyle: 'italic',
                  marginBottom: '1.5rem',
                  color: '#374151',
                  lineHeight: '1.6'
                }}>
                  "{testimonial.content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Users style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="text-3xl font-bold text-gray-900" style={{ marginBottom: '1rem' }}>
              Sık Sorulan Sorular
            </h2>
            <p className="text-lg text-gray-600">
              Merak ettiklerinizin cevapları
            </p>
          </div>

          <div style={{ 
            maxWidth: '48rem', 
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {faqs.map((faq, index: number) => (
              <div key={index} className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#1e293b'
                }}>
                  {faq.question}
                </h3>
                <p style={{ 
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Kariyerinizi Bugün Hızlandırmaya Başlayın
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: 0.9, 
              marginBottom: '2rem' 
            }}>
              7 gün ücretsiz deneme ile Premium'un tüm özelliklerini keşfedin. 
              Kredi kartı gerekmez, istediğiniz zaman iptal edebilirsiniz.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleUpgradeClick} // Yönlendirme fonksiyonunu buraya ekledik
                className="btn btn-lg" 
                style={{ 
                  backgroundColor: '#fbbf24', 
                  color: '#1a202c',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Crown style={{ width: '1.25rem', height: '1.25rem' }} />
                Şimdi Premium'a Geç
              </button>
              <Link href="/builder" className="btn btn-lg" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'white',
                border: '2px solid white',
                color: 'white',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)'
              }}>
                Önce Deneyin
              </Link>
            </div>
            <p style={{ 
              fontSize: '0.875rem', 
              opacity: 0.8, 
              marginTop: '1.5rem' 
            }}>
              30 gün para iade garantisi • 24/7 destek • SSL güvenlik
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumPage;