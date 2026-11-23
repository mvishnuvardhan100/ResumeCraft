import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ResumeContext = createContext(null)

const initialResume = {
  personal: {
    firstName: '', lastName: '', role: '', email: '', phone: '',
    location: '', website: '', photo: '',
  },
  summary: '',
  education: [{ school: '', degree: '', start: '', end: '', grade: '' }],
  experience: [{ company: '', position: '', start: '', end: '', description: '' }],
  skills: 'JavaScript, React, Java, SQL',
  projects: [{ name: '', technologies: '', description: '', link: '' }],
  certifications: '',
  achievements: '',
  color: '#6d4aff',
}

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem('resumecraft-data')
      return saved ? { ...initialResume, ...JSON.parse(saved) } : initialResume
    } catch {
      return initialResume
    }
  })
  const [template, setTemplate] = useState(() => localStorage.getItem('resumecraft-template') || 'minimal')

  useEffect(() => {
    localStorage.setItem('resumecraft-data', JSON.stringify(resume))
  }, [resume])

  useEffect(() => {
    localStorage.setItem('resumecraft-template', template)
  }, [template])

  const value = useMemo(() => ({ resume, setResume, template, setTemplate }), [resume, template])
  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) throw new Error('useResume must be used inside ResumeProvider')
  return context
}
