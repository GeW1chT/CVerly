// app/pricing/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check,
  Crown,
  Star,
  Zap,
  Shield,
  Download,
  Palette,
  FileText,
  Users,
  Clock,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Globe
} from 'lucide-react';
import { useSettings, useTranslation, getThemeColors } from '../contexts/SettingsContext';

// Plan ve diğer props'lar için tip arayüzleri
interface Plan {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  limitations?: string[];
  buttonText: string;
  popular: boolean;
}

// Burada 'free', 'basic', 'pro', 'enterprise' string'lerinin birleşim tipi olarak tanımlıyoruz.
type PlanKey = 'free' | 'basic' | 'pro' | 'enterprise';

interface Plans {
  [key: string]: Plan;
}

interface ThemeColors {
  background: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  border: string;
  inputBg: string;
}

interface Settings {
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}

interface PaymentModalProps {
  show: boolean;
  onClose: () => void;
  selectedPremiumPlan: PlanKey;
  selectedPlan: 'monthly' | 'yearly';
  plans: Plans;
  themeColors: ThemeColors;
  settings: Settings;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  show, 
  onClose, 
  selectedPremiumPlan, 
  selectedPlan, 
  plans, 
  themeColors, 
  settings 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'crypto'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [modalBillingType, setModalBillingType] = useState(selectedPlan);

  useEffect(() => {
    setModalBillingType(selectedPlan);
  }, [selectedPlan]);

  const selectedPlanDetails = plans[selectedPremiumPlan];
  if (!selectedPlanDetails) {
    return null;
  }

  const finalPrice = selectedPlanDetails.price[modalBillingType];
  const yearlyDiscount = Math.round((selectedPlanDetails.price.monthly * 12 - selectedPlanDetails.price.yearly) / (selectedPlanDetails.price.monthly * 12) * 100);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      z-index: 1000;
      font-weight: 600;
      font-size: 0.875rem;
    `;
    
    notification.textContent = 'Ödeme başarılı! Premium hesabınız aktifleştirildi.';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
      onClose();
      setIsProcessing(false);
    }, 2000);
  };
  
  if (!show) {
      return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: themeColors.cardBg,
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: themeColors.textPrimary, 
              margin: '0 0 0.5rem 0' 
            }}>
              Ödeme Bilgileri
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: themeColors.textSecondary, 
              margin: 0 
            }}>
              {selectedPlanDetails.name} planını satın alın
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: themeColors.textSecondary,
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
          >
            &times;
          </button>
        </div>

        {/* Plan Summary */}
        <div style={{
          background: settings.preferences.theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(249, 250, 251, 0.8)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: `1px solid ${themeColors.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: themeColors.textPrimary 
              }}>
                {selectedPlanDetails.name}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: themeColors.textSecondary 
              }}>
                {modalBillingType === 'yearly' ? 'Yıllık Plan' : 'Aylık Plan'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: themeColors.textPrimary 
              }}>
                ₺{finalPrice}
              </div>
              {modalBillingType === 'yearly' && (
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#10b981',
                  fontWeight: '500'
                }}>
                  %{yearlyDiscount} tasarruf
                </div>
              )}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => setModalBillingType('monthly')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: modalBillingType === 'monthly' ? '2px solid #3b82f6' : `1px solid ${themeColors.border}`,
                borderRadius: '8px',
                background: modalBillingType === 'monthly' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: modalBillingType === 'monthly' ? '#3b82f6' : themeColors.textPrimary,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Aylık
            </button>
            <button
              onClick={() => setModalBillingType('yearly')}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: modalBillingType === 'yearly' ? '2px solid #3b82f6' : `1px solid ${themeColors.border}`,
                borderRadius: '8px',
                background: modalBillingType === 'yearly' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: modalBillingType === 'yearly' ? '#3b82f6' : themeColors.textPrimary,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Yıllık (İndirimli)
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: themeColors.textPrimary, 
            marginBottom: '1rem' 
          }}>
            Ödeme Yöntemi Seçin
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { id: 'card', label: 'Kredi/Banka Kartı', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
              { id: 'mobile', label: 'Mobil Ödeme', icon: Smartphone, desc: 'Turkcell, Vodafone, Türk Telekom' },
              { id: 'crypto', label: 'Kripto Para', icon: Globe, desc: 'Bitcoin, Ethereum, USDT' }
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as 'card' | 'mobile' | 'crypto')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    border: paymentMethod === method.id ? '2px solid #3b82f6' : `1px solid ${themeColors.border}`,
                    borderRadius: '12px',
                    background: paymentMethod === method.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: paymentMethod === method.id ? '#3b82f6' : themeColors.textPrimary,
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  <Icon style={{ 
                    width: '1.5rem', 
                    height: '1.5rem', 
                    color: paymentMethod === method.id ? '#3b82f6' : themeColors.textSecondary 
                  }} />
                  <div>
                    <div style={{ 
                      fontWeight: '500', 
                      color: paymentMethod === method.id ? '#3b82f6' : themeColors.textPrimary 
                    }}>
                      {method.label}
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: themeColors.textSecondary 
                    }}>
                      {method.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Form */}
        {paymentMethod === 'card' && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: themeColors.textPrimary, 
                marginBottom: '0.5rem' 
              }}>
                Kart Numarası
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '8px',
                  background: themeColors.inputBg,
                  color: themeColors.textPrimary
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: themeColors.textPrimary, 
                  marginBottom: '0.5rem' 
                }}>
                  Son Kullanma
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '8px',
                    background: themeColors.inputBg,
                    color: themeColors.textPrimary
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: themeColors.textPrimary, 
                  marginBottom: '0.5rem' 
                }}>
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${themeColors.border}`,
                    borderRadius: '8px',
                    background: themeColors.inputBg,
                    color: themeColors.textPrimary
                  }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: themeColors.textPrimary, 
                marginBottom: '0.5rem' 
              }}>
                Kart Sahibi
              </label>
              <input
                type="text"
                placeholder="Adınız Soyadınız"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '8px',
                  background: themeColors.inputBg,
                  color: themeColors.textPrimary
                }}
              />
            </div>
          </div>
        )}

        {/* Security Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem',
          background: settings.preferences.theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : '#ecfdf5',
          borderRadius: '8px',
          marginBottom: '2rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <Shield style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '500' }}>
            256-bit SSL şifreleme ile güvenli ödeme
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.875rem 1.5rem',
              border: `1px solid ${themeColors.border}`,
              borderRadius: '12px',
              background: 'transparent',
              color: themeColors.textPrimary,
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            İptal
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            style={{
              flex: 2,
              padding: '0.875rem 1.5rem',
              border: 'none',
              borderRadius: '12px',
              background: isProcessing ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isProcessing ? (
              <>
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                İşleniyor...
              </>
            ) : (
              <>
                <CreditCard style={{ width: '1rem', height: '1rem' }} />
                ₺{finalPrice} Öde
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function PricingPage() {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const themeColors: ThemeColors = getThemeColors(settings.preferences.theme);
  
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPremiumPlan, setSelectedPremiumPlan] = useState<PlanKey>('pro');

  const plans: Plans = {
    free: {
      name: 'Ücretsiz',
      price: { monthly: 0, yearly: 0 },
      description: 'Başlamak için mükemmel',
      features: [
        '3 temel şablon',
        '5 CV oluşturma',
        'PDF indirme',
        'Temel düzenleme araçları',
        'E-posta desteği'
      ],
      limitations: [
        'Sınırlı şablon seçeneği',
        'Watermark&apos;sız PDF', // Burada kaçış karakteri düzeltildi
        'Temel özellikler'
      ],
      buttonText: 'Mevcut Plan',
      popular: false
    },
    basic: {
      name: 'Basic Premium',
      price: { monthly: 29, yearly: 290 },
      description: 'Kişisel kullanım için ideal',
      features: [
        '15 premium şablon',
        'Sınırsız CV oluşturma',
        'Watermark&apos;sız PDF', // Burada kaçış karakteri düzeltildi
        'Gelişmiş düzenleme araçları',
        'Özel renkler ve fontlar',
        'Öncelikli e-posta desteği',
        '3 dil desteği'
      ],
      buttonText: 'Basic&apos;e Geç', // Burada kaçış karakteri düzeltildi
      popular: false
    },
    pro: {
      name: 'Pro Premium',
      price: { monthly: 49, yearly: 490 },
      description: 'Profesyoneller için en popüler',
      features: [
        '50+ premium şablon',
        'Sınırsız CV oluşturma',
        'Watermark&apos;sız PDF', // Burada kaçış karakteri düzeltildi
        'Tüm düzenleme araçları',
        'Özel tasarım editörü',
        'AI destekli içerik önerileri',
        'Cover letter şablonları',
        'LinkedIn entegrasyonu',
        'Öncelikli chat desteği',
        'Tüm dil desteği',
        'İstatistik ve analitik'
      ],
      buttonText: 'Pro&apos;ya Geç', // Burada kaçış karakteri düzeltildi
      popular: true
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 99, yearly: 990 },
      description: 'Ekipler ve kurumlar için',
      features: [
        'Tüm Pro özellikler',
        'Ekip yönetimi (10 kullanıcı)',
        'Özel şablon tasarımı',
        'API erişimi',
        'White-label çözümü',
        'Özel entegrasyonlar',
        'Dedicated hesap yöneticisi',
        '7/24 telefon desteği',
        'SLA garantisi',
        'Özel eğitim seansları'
      ],
      buttonText: 'Enterprise&apos;a Geç', // Burada kaçış karakteri düzeltildi
      popular: false
    }
  };

  const handleSelectPlan = (planType: PlanKey) => {
    setSelectedPremiumPlan(planType);
    setShowPaymentModal(true);
  };
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: themeColors.background,
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/dashboard" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '2rem'
          }}>
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Dashboard&apos;a Dön
          </Link>
          
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              <Crown style={{ width: '2rem', height: '2rem', color: '#fbbf24' }} />
              <h1 style={{ fontSize: '3rem', fontWeight: '700', margin: 0 }}>
                Premium Planlar
              </h1>
            </div>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: 0.9, 
              maxWidth: '600px', 
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Profesyonel CV&apos;lerinizi bir üst seviyeye taşıyın. Premium özelliklerle 
              daha fazla şablon, gelişmiş araçlar ve öncelikli destek.
            </p>
            
            {/* Billing Toggle */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.5rem',
              borderRadius: '50px',
              maxWidth: 'fit-content',
              margin: '0 auto'
            }}>
              <button
                onClick={() => setSelectedPlan('monthly')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  background: selectedPlan === 'monthly' ? 'white' : 'transparent',
                  color: selectedPlan === 'monthly' ? '#667eea' : 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Aylık
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  background: selectedPlan === 'yearly' ? 'white' : 'transparent',
                  color: selectedPlan === 'yearly' ? '#667eea' : 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                Yıllık
                <span style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '-0.5rem',
                  background: '#fbbf24',
                  color: '#1a202c',
                  fontSize: '0.6rem',
                  fontWeight: 'bold',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '50px'
                }}>
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              style={{
                background: themeColors.cardBg,
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: plan.popular ? '0 25px 50px rgba(102, 126, 234, 0.25)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: plan.popular ? '2px solid #667eea' : `1px solid ${themeColors.border}`,
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!plan.popular) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                }}>
                  <Star style={{ width: '1rem', height: '1rem' }} />
                  En Popüler
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: themeColors.textPrimary, 
                  marginBottom: '0.5rem' 
                }}>
                  {plan.name}
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: themeColors.textSecondary, 
                  marginBottom: '1.5rem' 
                }}>
                  {plan.description}
                </p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ 
                    fontSize: '3rem', 
                    fontWeight: '700', 
                    color: themeColors.textPrimary 
                  }}>
                    ₺{plan.price[selectedPlan]}
                  </span>
                  {key !== 'free' && (
                    <span style={{ 
                      fontSize: '1rem', 
                      color: themeColors.textSecondary 
                    }}>
                      /{selectedPlan === 'yearly' ? 'yıl' : 'ay'}
                    </span>
                  )}
                </div>
                
                {selectedPlan === 'yearly' && key !== 'free' && (
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#10b981', 
                    fontWeight: '500' 
                  }}>
                    Yıllık ödemede %{Math.round((plan.price.monthly * 12 - plan.price.yearly) / (plan.price.monthly * 12) * 100)} tasarruf
                  </div>
                )}
              </div>

              <ul style={{ marginBottom: '2rem', padding: 0, listStyle: 'none' }}>
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    marginBottom: '0.75rem',
                    fontSize: '0.875rem',
                    color: themeColors.textPrimary
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

              {key === 'free' ? (
                <button
                  disabled
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    border: `2px solid ${themeColors.border}`,
                    background: themeColors.inputBg,
                    color: themeColors.textSecondary,
                    fontWeight: '600',
                    cursor: 'not-allowed'
                  }}
                >
                  {plan.buttonText}
                </button>
              ) : (
                <button
                  onClick={() => handleSelectPlan(key as PlanKey)}
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : `linear-gradient(135deg, ${themeColors.textPrimary} 0%, ${themeColors.textSecondary} 100%)`,
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: plan.popular 
                      ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = plan.popular 
                      ? '0 8px 25px rgba(102, 126, 234, 0.5)' 
                      : '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = plan.popular 
                      ? '0 4px 15px rgba(102, 126, 234, 0.4)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div style={{ 
        background: settings.preferences.theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.8)', 
        padding: '4rem 0' 
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: themeColors.textPrimary, 
              marginBottom: '1rem' 
            }}>
              Premium ile Neler Kazanırsınız?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: themeColors.textSecondary, 
              maxWidth: '600px', 
              margin: '0 auto' 
            }}>
              Profesyonel kariyerinizi destekleyecek gelişmiş özellikler
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: Palette,
                title: '50+ Premium Şablon',
                description: 'Sektöre özel tasarlanmış profesyonel şablonlar',
                color: '#667eea'
              },
              {
                icon: Zap,
                title: 'AI Destekli İçerik',
                description: 'Yapay zeka ile optimize edilmiş CV içeriği önerileri',
                color: '#10b981'
              },
              {
                icon: Download,
                title: 'Watermarksız PDF',
                description: 'Temiz, profesyonel PDF çıktıları',
                color: '#f59e0b'
              },
              {
                icon: Users,
                title: 'Öncelikli Destek',
                description: '7/24 chat desteği ve telefon desteği',
                color: '#8b5cf6'
              },
              {
                icon: FileText,
                title: 'Cover Letter',
                description: 'Ön yazı şablonları ve özelleştirme araçları',
                color: '#ef4444'
              },
              {
                icon: Clock,
                title: 'İstatistik & Analitik',
                description: 'CV görüntülenme ve başarı analizi',
                color: '#06b6d4'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} style={{
                  background: themeColors.cardBg,
                  padding: '2rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: `1px solid ${themeColors.border}`,
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    border: `2px solid ${feature.color}30`
                  }}>
                    <Icon style={{ width: '2rem', height: '2rem', color: feature.color }} />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    color: themeColors.textPrimary, 
                    marginBottom: '0.75rem' 
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: themeColors.textSecondary, 
                    lineHeight: '1.5' 
                  }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: themeColors.textPrimary, 
            marginBottom: '1rem' 
          }}>
            Sık Sorulan Sorular
          </h2>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              question: 'Premium planımı istediğim zaman iptal edebilir miyim?',
              answer: 'Evet, premium planınızı istediğiniz zaman iptal edebilirsiniz. İptal ettiğinizde mevcut dönem sonuna kadar premium özelliklerini kullanmaya devam edebilirsiniz.'
            },
            {
              question: 'Ücretsiz plandan premium plana geçiş nasıl olur?',
              answer: 'Mevcut CV&apos;leriniz ve ayarlarınız korunur. Sadece premium özellikler aktifleşir ve daha fazla şablona erişim kazanırsınız.'
            },
            {
              question: 'Premium planımda kaç CV oluşturabilirim?',
              answer: 'Premium planlarda sınırsız CV oluşturabilirsiniz. İstediğiniz kadar CV yapıp düzenleyebilirsiniz.'
            },
            {
              question: 'Ödeme güvenliği nasıl sağlanıyor?',
              answer: '256-bit SSL şifreleme ile tüm ödemeleriniz güvenli şekilde işlenir. Kart bilgileriniz saklanmaz ve PCI DSS standartlarına uygun işlem yapılır.'
            },
            {
              question: 'Yıllık plan avantajları nelerdir?',
              answer: 'Yıllık planlarda %20 indirim kazanırsınız ve ödeme yapmayı unutma riski ortadan kalkar. Ayrıca yıllık plan sahipleri için özel bonuslar sunuyoruz.'
            }
          ].map((faq, index) => (
            <details key={index} style={{
              background: themeColors.cardBg,
              marginBottom: '1rem',
              borderRadius: '12px',
              border: `1px solid ${themeColors.border}`,
              overflow: 'hidden'
            }}>
              <summary style={{
                padding: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: themeColors.textPrimary,
                cursor: 'pointer',
                listStyle: 'none',
                userSelect: 'none'
              }}>
                {faq.question}
              </summary>
              <div style={{
                padding: '0 1.5rem 1.5rem',
                fontSize: '0.875rem',
                color: themeColors.textSecondary,
                lineHeight: '1.6',
                borderTop: `1px solid ${themeColors.border}`
              }}>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <Crown style={{ width: '4rem', height: '4rem', color: '#fbbf24', margin: '0 auto 2rem' }} />
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem' 
          }}>
            Profesyonel Kariyerinize Yatırım Yapın
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.9, 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Premium özellikleriyle CV&apos;nizi öne çıkarın ve iş başvurularınızda fark yaratın.
          </p>
          <button
            onClick={() => handleSelectPlan('pro')}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              fontWeight: '700',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
            }}
          >
            Pro Premium&apos;u Deneyin
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPremiumPlan={selectedPremiumPlan}
        selectedPlan={selectedPlan}
        plans={plans}
        themeColors={themeColors}
        settings={settings}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        details[open] summary {
          border-bottom: 1px solid var(--border-light);
        }
      `}</style>
    </div>
  );
}