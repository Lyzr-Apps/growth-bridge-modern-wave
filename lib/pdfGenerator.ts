// PDF Generation utility for CV export
// Uses jsPDF for client-side PDF generation

export interface CVData {
  personal_info: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    summary: string
  }
  experience: Array<{
    title: string
    company: string
    location: string
    duration: string
    responsibilities: string[]
  }>
  skills: {
    technical: string[]
    soft: string[]
    tools: string[]
  }
  education: Array<{
    degree: string
    institution: string
    duration: string
    details: string
  }>
  certifications: string[]
  achievements: string[]
}

export async function generateCVPDF(cvData: CVData): Promise<Blob> {
  // Dynamic import to avoid SSR issues
  const jsPDF = (await import('jspdf')).default

  const doc = new jsPDF()
  let yPos = 20

  // Helper function to add text with automatic page breaks
  const addText = (text: string, x: number, size: number = 10, style: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)

    if (yPos > 270) {
      doc.addPage()
      yPos = 20
    }

    doc.text(text, x, yPos)
    yPos += size * 0.5
  }

  const addSection = (title: string) => {
    yPos += 5
    doc.setFillColor(59, 130, 246) // Blue color
    doc.rect(10, yPos - 4, 190, 8, 'F')
    doc.setTextColor(255, 255, 255)
    addText(title, 12, 12, 'bold')
    doc.setTextColor(0, 0, 0)
    yPos += 3
  }

  // Header - Personal Info
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(59, 130, 246)
  doc.text(cvData.personal_info.name, 105, yPos, { align: 'center' })
  yPos += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  const contactInfo = `${cvData.personal_info.email} | ${cvData.personal_info.phone} | ${cvData.personal_info.location}`
  doc.text(contactInfo, 105, yPos, { align: 'center' })
  yPos += 5
  doc.text(cvData.personal_info.linkedin, 105, yPos, { align: 'center' })
  yPos += 10

  // Professional Summary
  if (cvData.personal_info.summary) {
    addSection('PROFESSIONAL SUMMARY')
    const summaryLines = doc.splitTextToSize(cvData.personal_info.summary, 180)
    summaryLines.forEach((line: string) => {
      addText(line, 12, 10)
    })
  }

  // Experience
  if (cvData.experience && cvData.experience.length > 0) {
    addSection('PROFESSIONAL EXPERIENCE')
    cvData.experience.forEach((exp) => {
      addText(`${exp.title} at ${exp.company}`, 12, 11, 'bold')
      addText(`${exp.location} | ${exp.duration}`, 12, 9)
      yPos += 2
      exp.responsibilities.forEach((resp) => {
        const respLines = doc.splitTextToSize(`• ${resp}`, 175)
        respLines.forEach((line: string) => {
          addText(line, 15, 9)
        })
      })
      yPos += 3
    })
  }

  // Skills
  if (cvData.skills) {
    addSection('SKILLS')
    if (cvData.skills.technical && cvData.skills.technical.length > 0) {
      addText('Technical Skills:', 12, 10, 'bold')
      addText(cvData.skills.technical.join(', '), 12, 9)
      yPos += 2
    }
    if (cvData.skills.tools && cvData.skills.tools.length > 0) {
      addText('Tools & Technologies:', 12, 10, 'bold')
      addText(cvData.skills.tools.join(', '), 12, 9)
      yPos += 2
    }
    if (cvData.skills.soft && cvData.skills.soft.length > 0) {
      addText('Soft Skills:', 12, 10, 'bold')
      addText(cvData.skills.soft.join(', '), 12, 9)
      yPos += 2
    }
  }

  // Education
  if (cvData.education && cvData.education.length > 0) {
    addSection('EDUCATION')
    cvData.education.forEach((edu) => {
      addText(edu.degree, 12, 11, 'bold')
      addText(`${edu.institution} | ${edu.duration}`, 12, 9)
      if (edu.details) {
        addText(edu.details, 12, 9)
      }
      yPos += 3
    })
  }

  // Certifications
  if (cvData.certifications && cvData.certifications.length > 0) {
    addSection('CERTIFICATIONS')
    cvData.certifications.forEach((cert) => {
      addText(`• ${cert}`, 12, 9)
    })
    yPos += 2
  }

  // Achievements
  if (cvData.achievements && cvData.achievements.length > 0) {
    addSection('ACHIEVEMENTS')
    cvData.achievements.forEach((achievement) => {
      const achLines = doc.splitTextToSize(`• ${achievement}`, 175)
      achLines.forEach((line: string) => {
        addText(line, 12, 9)
      })
    })
  }

  return doc.output('blob')
}

export function downloadPDF(blob: Blob, filename: string = 'CV.pdf') {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
