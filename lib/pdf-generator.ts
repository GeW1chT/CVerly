// lib/simple-pdf-generator.ts

// Basit PDF generator (external library olmadan)
export const generateSimplePDF = (cvData: any): void => {
  try {
    const { personalInfo, experience } = cvData;
    
    // HTML içeriği oluştur
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>CV - ${personalInfo?.firstName} ${personalInfo?.lastName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .name {
              font-size: 28px;
              font-weight: bold;
              margin: 0;
              color: #1e293b;
            }
            .title {
              font-size: 18px;
              color: #2563eb;
              margin: 5px 0;
            }
            .contact {
              font-size: 14px;
              color: #64748b;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #1e293b;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 5px;
              margin-bottom: 15px;
            }
            .experience-item {
              margin-bottom: 20px;
              padding: 15px;
              background: #f8fafc;
              border-left: 3px solid #2563eb;
            }
            .experience-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            .position {
              font-weight: bold;
              color: #1e293b;
            }
            .company {
              color: #2563eb;
              font-size: 14px;
            }
            .date {
              font-size: 12px;
              color: #64748b;
            }
            .description {
              font-size: 14px;
              color: #374151;
              margin-top: 8px;
            }
            @media print {
              body { margin: 0; }
              @page { margin: 1cm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="name">${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}</h1>
            <p class="title">${personalInfo?.title || ''}</p>
            <div class="contact">
              <p>${personalInfo?.email || ''} | ${personalInfo?.phone || ''}</p>
              <p>${personalInfo?.location || ''}</p>
            </div>
          </div>

          ${personalInfo?.summary ? `
            <div class="section">
              <h2 class="section-title">ÖZET</h2>
              <p>${personalInfo.summary}</p>
            </div>
          ` : ''}

          ${experience && experience.length > 0 ? `
            <div class="section">
              <h2 class="section-title">İŞ DENEYİMİ</h2>
              ${experience.map((exp: any) => `
                <div class="experience-item">
                  <div class="experience-header">
                    <div>
                      <div class="position">${exp.position || ''}</div>
                      <div class="company">${exp.company || ''} - ${exp.location || ''}</div>
                    </div>
                    <div class="date">
                      ${exp.startDate || ''} - ${exp.current ? 'Devam ediyor' : exp.endDate || ''}
                    </div>
                  </div>
                  ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div style="text-align: center; margin-top: 40px; font-size: 12px; color: #9ca3af;">
            Bu CV CVerly.com ile oluşturulmuştur
          </div>
        </body>
      </html>
    `;

    // Yeni pencere aç ve yazdır
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // PDF olarak kaydetme seçeneği göster
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      // Popup engellenirse, dosya indirme alternatifi
      downloadAsHTML(htmlContent, `${personalInfo?.firstName}_${personalInfo?.lastName}_CV.html`);
    }

  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
    throw new Error('PDF oluşturulamadı. Lütfen tekrar deneyin.');
  }
};

// HTML dosyası olarak indirme fonksiyonu
const downloadAsHTML = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Advanced PDF generator (eğer jsPDF yüklüyse)
export const generateAdvancedPDF = async (cvData: any): Promise<void> => {
  try {
    // Dinamik import ile jsPDF'i yükle
    const jsPDF = (await import('jspdf')).default;
    
    const { personalInfo, experience } = cvData;
    const pdf = new jsPDF();
    
    let yPosition = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Header
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(37, 99, 235);
    pdf.text(personalInfo?.title || '', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`${personalInfo?.email || ''} • ${personalInfo?.phone || ''}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 5;
    pdf.text(personalInfo?.location || '', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 15;

    // Summary
    if (personalInfo?.summary) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ÖZET', margin, yPosition);
      
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const summaryLines = pdf.splitTextToSize(personalInfo.summary, contentWidth);
      pdf.text(summaryLines, margin, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Experience
    if (experience && experience.length > 0) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('İŞ DENEYİMİ', margin, yPosition);
      yPosition += 10;

      experience.forEach((exp: any) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(exp.position || '', margin, yPosition);
        
        yPosition += 6;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(37, 99, 235);
        pdf.text(`${exp.company || ''} - ${exp.location || ''}`, margin, yPosition);
        
        yPosition += 5;
        pdf.setTextColor(100, 116, 139);
        pdf.text(`${exp.startDate || ''} - ${exp.current ? 'Devam ediyor' : exp.endDate || ''}`, margin, yPosition);
        
        if (exp.description) {
          yPosition += 6;
          pdf.setTextColor(0, 0, 0);
          const descLines = pdf.splitTextToSize(exp.description, contentWidth);
          pdf.text(descLines, margin, yPosition);
          yPosition += descLines.length * 4;
        }
        
        yPosition += 8;
      });
    }

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    pdf.text('Bu CV CVerly.com ile oluşturulmuştur', pageWidth / 2, 280, { align: 'center' });

    // Save
    const filename = `${personalInfo?.firstName || 'CV'}_${personalInfo?.lastName || 'Resume'}.pdf`;
    pdf.save(filename);

  } catch (error) {
    console.error('Advanced PDF oluşturma hatası:', error);
    // Fallback olarak basit PDF'i kullan
    generateSimplePDF(cvData);
  }
};

// Ana export fonksiyonu
export const downloadCV = async (cvData: any, method: 'simple' | 'advanced' = 'simple'): Promise<void> => {
  if (method === 'advanced') {
    await generateAdvancedPDF(cvData);
  } else {
    generateSimplePDF(cvData);
  }
};