// components/forms/PersonalInfoForm.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfo } from '@/lib/types';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

// Validation Schema
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  title: z.string().min(2, 'Başlık gereklidir'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  location: z.string().min(2, 'Konum gereklidir'),
  website: z.string().url('Geçerli bir URL girin').optional().or(z.literal('')),
  linkedin: z.string().url('Geçerli bir LinkedIn URL girin').optional().or(z.literal('')),
  github: z.string().url('Geçerli bir GitHub URL girin').optional().or(z.literal('')),
  summary: z.string().min(50, 'Özet en az 50 karakter olmalıdır').max(500, 'Özet en fazla 500 karakter olabilir'),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  initialData?: PersonalInfo;
  onSubmit: (data: PersonalInfo) => void;
  onNext: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialData,
  onSubmit,
  onNext
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    mode: 'onChange'
  });

  const formData = watch();

  const handleFormSubmit = (data: PersonalInfoFormData) => {
    onSubmit(data as PersonalInfo);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            Kişisel Bilgiler
          </CardTitle>
          <CardDescription>
            CV'nizin temelini oluşturacak kişisel bilgilerinizi girin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad *</Label>
                <Input
                  id="firstName"
                  placeholder="Adınızı girin"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad *</Label>
                <Input
                  id="lastName"
                  placeholder="Soyadınızı girin"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Başlık/Pozisyon *</Label>
              <Input
                id="title"
                placeholder="ör: Yazılım Geliştirici, Pazarlama Uzmanı"
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefon *
                </Label>
                <Input
                  id="phone"
                  placeholder="+90 555 123 45 67"
                  {...register('phone')}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Konum *
              </Label>
              <Input
                id="location"
                placeholder="İstanbul, Türkiye"
                {...register('location')}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Sosyal Medya & Web (İsteğe bağlı)</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://website.com"
                    {...register('website')}
                    className={errors.website ? 'border-red-500' : ''}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-600">{errors.website.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/kullanici"
                    {...register('linkedin')}
                    className={errors.linkedin ? 'border-red-500' : ''}
                  />
                  {errors.linkedin && (
                    <p className="text-sm text-red-600">{errors.linkedin.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/kullanici"
                    {...register('github')}
                    className={errors.github ? 'border-red-500' : ''}
                  />
                  {errors.github && (
                    <p className="text-sm text-red-600">{errors.github.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary">Kişisel Özet *</Label>
              <Textarea
                id="summary"
                placeholder="Kendinizi ve kariyerinizi kısaca özetleyin. Yeteneklerinizi, deneyimlerinizi ve hedeflerinizi belirtin..."
                className={`min-h-[120px] ${errors.summary ? 'border-red-500' : ''}`}
                {...register('summary')}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  {errors.summary && (
                    <span className="text-red-600">{errors.summary.message}</span>
                  )}
                </span>
                <span>
                  {formData.summary?.length || 0}/500 karakter
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={!isValid}
                className="px-8"
              >
                Devam Et
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;