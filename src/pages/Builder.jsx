import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Download, Plus, Trash2, Upload, User, GraduationCap, BriefcaseBusiness, Code2, Award, Eye, Palette } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import NavBar from '../components/NavBar'
import { useResume } from '../context/ResumeContext'
import Minimal from '../templates/Minimal'
import Professional from '../templates/Professional'
import Creative from '../templates/Creative'

const steps = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'summary', label: 'Summary', icon: Eye },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'skills', label: 'Skills & projects', icon: Code2 },
  { id: 'extras', label: 'Extras', icon: Award },
]

function Field({ label, value, onChange, placeholder, type = 'text', multiline = false }) {
  const common = { value: value ?? '', onChange: e => onChange(e.target.value), placeholder, className: 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100' }
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span>{multiline ? <textarea {...common} rows={4} /> : <input {...common} type={type} />}</label>
}

function SectionHeading({ title, subtitle }) {
  return <div className="mb-6"><h2 className="text-xl font-black text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>
}

export default function Builder() {
  const { resume, setResume, template, setTemplate } = useResume()
  const [active, setActive] = useState('personal')
  const [showPreview, setShowPreview] = useState(false)
  const previewRef = useRef(null)
  const fileRef = useRef(null)
  const navigate = useNavigate()
  const update = (key, value) => setResume(prev => ({ ...prev, [key]: value }))
  const updatePersonal = (key, value) => setResume(prev => ({ ...prev, personal: { ...prev.personal, [key]: value } }))
  const updateArray = (key, index, field, value) => setResume(prev => ({ ...prev, [key]: prev[key].map((item, i) => i === index ? { ...item, [field]: value } : item) }))
  const addItem = (key, item) => update(key, [...resume[key], item])
  const removeItem = (key, index) => update(key, resume[key].filter((_, i) => i !== index))
  const currentStep = steps.findIndex(s => s.id === active)
  const Template = useMemo(() => ({ minimal: Minimal, professional: Professional, creative: Creative }[template] || Minimal), [template])

  const uploadPhoto = e => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return alert('Please choose an image file.')
    if (file.size > 5 * 1024 * 1024) return alert('Please choose an image smaller than 5 MB.')
    const reader = new FileReader()
    reader.onload = () => updatePersonal('photo', reader.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const downloadPDF = () => {
    if (!previewRef.current) return
    const name = `${resume.personal.firstName || 'My'}-${resume.personal.lastName || 'Resume'}`.replace(/\s+/g, '-')
    html2pdf().set({
      margin: 0,
      filename: `${name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }).from(previewRef.current).save()
  }

  return <div className="min-h-screen bg-[#f7f6fb]">
    <NavBar />
    <div className="mx-auto max-w-[1600px] px-4 py-5 md:px-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><Link to="/templates" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-violet-700"><ArrowLeft size={14}/> Templates</Link><h1 className="mt-2 text-2xl font-black text-slate-950">Build your resume</h1><p className="text-sm text-slate-500">Your changes are saved automatically in this browser.</p></div>
        <div className="flex gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 lg:hidden"><Eye size={16}/>{showPreview ? 'Edit details' : 'Preview'}</button>
          <button onClick={downloadPDF} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"><Download size={16}/> Download PDF</button>
        </div>
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(360px,0.82fr)_minmax(500px,1.18fr)]">
        <section className={`${showPreview ? 'hidden lg:block' : 'block'} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm`}>
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="mb-3 flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-slate-500">Resume details</span><span className="text-xs font-bold text-violet-600">{currentStep + 1} / {steps.length}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}/></div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{steps.map(({ id, label, icon: Icon }, i) => <button key={id} onClick={() => setActive(id)} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold transition ${active === id ? 'bg-violet-50 text-violet-700' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}><Icon size={17}/>{label}</button>)}</div>
          </div>
          <div className="p-5 md:p-6">
            {active === 'personal' && <><SectionHeading title="Personal information" subtitle="Let employers know how to reach you."/><div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              {resume.personal.photo ? <img src={resume.personal.photo} alt="Profile" className="h-16 w-16 rounded-2xl object-cover"/> : <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600"><User size={25}/></div>}
              <div className="flex-1"><div className="text-sm font-bold text-slate-800">Profile photo <span className="font-normal text-slate-400">(optional)</span></div><p className="mt-1 text-xs text-slate-500">JPG or PNG, maximum 5 MB. Used in Professional and Creative templates.</p><div className="mt-2 flex gap-3"><button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1 text-xs font-bold text-violet-700"><Upload size={13}/> Upload photo</button>{resume.personal.photo && <button onClick={() => updatePersonal('photo', '')} className="text-xs font-bold text-rose-500">Remove</button>}</div><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadPhoto}/></div>
            </div><div className="grid gap-4 sm:grid-cols-2"><Field label="First name" value={resume.personal.firstName} onChange={v => updatePersonal('firstName', v)} placeholder="e.g. Alex"/><Field label="Last name" value={resume.personal.lastName} onChange={v => updatePersonal('lastName', v)} placeholder="e.g. Morgan"/><Field label="Professional title" value={resume.personal.role} onChange={v => updatePersonal('role', v)} placeholder="e.g. Software Developer"/><Field label="Email address" type="email" value={resume.personal.email} onChange={v => updatePersonal('email', v)} placeholder="alex@email.com"/><Field label="Phone number" value={resume.personal.phone} onChange={v => updatePersonal('phone', v)} placeholder="+91 98765 43210"/><Field label="Location" value={resume.personal.location} onChange={v => updatePersonal('location', v)} placeholder="City, Country"/><div className="sm:col-span-2"><Field label="Website / LinkedIn" value={resume.personal.website} onChange={v => updatePersonal('website', v)} placeholder="linkedin.com/in/yourname"/></div></div></>}
            {active === 'summary' && <><SectionHeading title="Professional summary" subtitle="Write 2–4 sentences about your strengths and career goals."/><Field label="About you" multiline value={resume.summary} onChange={v => update('summary', v)} placeholder="Motivated computer science student with a strong foundation in Java, React and problem solving..."/></>}
            {active === 'education' && <><SectionHeading title="Education" subtitle="Add your degrees, college and academic details."/>{resume.education.map((item, i) => <div key={i} className="mb-5 rounded-2xl border border-slate-200 p-4"><div className="mb-4 flex items-center justify-between"><b className="text-sm text-slate-800">Education {i + 1}</b>{resume.education.length > 1 && <button onClick={() => removeItem('education', i)} className="text-rose-500"><Trash2 size={16}/></button>}</div><div className="grid gap-3 sm:grid-cols-2"><Field label="Degree" value={item.degree} onChange={v => updateArray('education', i, 'degree', v)} placeholder="B.Tech in Computer Science"/><Field label="College / University" value={item.school} onChange={v => updateArray('education', i, 'school', v)} placeholder="University name"/><Field label="Start year" value={item.start} onChange={v => updateArray('education', i, 'start', v)} placeholder="2023"/><Field label="End year" value={item.end} onChange={v => updateArray('education', i, 'end', v)} placeholder="2027"/><div className="sm:col-span-2"><Field label="Grade / CGPA" value={item.grade} onChange={v => updateArray('education', i, 'grade', v)} placeholder="9.2 CGPA"/></div></div></div>)}<button onClick={() => addItem('education', { school: '', degree: '', start: '', end: '', grade: '' })} className="inline-flex items-center gap-2 text-sm font-bold text-violet-700"><Plus size={16}/> Add education</button></>}
            {active === 'experience' && <><SectionHeading title="Work experience" subtitle="Include internships, jobs or relevant work experience."/>{resume.experience.map((item, i) => <div key={i} className="mb-5 rounded-2xl border border-slate-200 p-4"><div className="mb-4 flex items-center justify-between"><b className="text-sm text-slate-800">Experience {i + 1}</b>{resume.experience.length > 1 && <button onClick={() => removeItem('experience', i)} className="text-rose-500"><Trash2 size={16}/></button>}</div><div className="grid gap-3 sm:grid-cols-2"><Field label="Job title" value={item.position} onChange={v => updateArray('experience', i, 'position', v)} placeholder="Software Intern"/><Field label="Company" value={item.company} onChange={v => updateArray('experience', i, 'company', v)} placeholder="Company name"/><Field label="Start date" value={item.start} onChange={v => updateArray('experience', i, 'start', v)} placeholder="Jun 2025"/><Field label="End date" value={item.end} onChange={v => updateArray('experience', i, 'end', v)} placeholder="Aug 2025 / Present"/><div className="sm:col-span-2"><Field label="Responsibilities and impact" multiline value={item.description} onChange={v => updateArray('experience', i, 'description', v)} placeholder="Describe what you did and the impact you made."/></div></div></div>)}<button onClick={() => addItem('experience', { company: '', position: '', start: '', end: '', description: '' })} className="inline-flex items-center gap-2 text-sm font-bold text-violet-700"><Plus size={16}/> Add experience</button></>}
            {active === 'skills' && <><SectionHeading title="Skills & projects" subtitle="Highlight your strengths and the work you're proud of."/><Field label="Skills (separate with commas)" multiline value={resume.skills} onChange={v => update('skills', v)} placeholder="React, Java, SQL, Communication"/><div className="my-6 border-t border-slate-100"/><div className="mb-4 flex items-center justify-between"><div className="font-extrabold text-slate-900">Projects</div><button onClick={() => addItem('projects', { name: '', technologies: '', description: '', link: '' })} className="inline-flex items-center gap-1 text-xs font-bold text-violet-700"><Plus size={15}/> Add project</button></div>{resume.projects.map((item, i) => <div key={i} className="mb-4 rounded-2xl border border-slate-200 p-4"><div className="mb-3 flex items-center justify-between"><b className="text-sm">Project {i + 1}</b>{resume.projects.length > 1 && <button onClick={() => removeItem('projects', i)} className="text-rose-500"><Trash2 size={15}/></button>}</div><div className="grid gap-3"><Field label="Project name" value={item.name} onChange={v => updateArray('projects', i, 'name', v)} placeholder="Resume Builder"/><Field label="Technologies" value={item.technologies} onChange={v => updateArray('projects', i, 'technologies', v)} placeholder="React, Tailwind CSS"/><Field label="Description" multiline value={item.description} onChange={v => updateArray('projects', i, 'description', v)} placeholder="What does the project do?"/><Field label="Project link (optional)" value={item.link} onChange={v => updateArray('projects', i, 'link', v)} placeholder="github.com/username/project"/></div></div>)}</>}
            {active === 'extras' && <><SectionHeading title="Additional details" subtitle="Add certifications and achievements to strengthen your resume."/><Field label="Certifications" multiline value={resume.certifications} onChange={v => update('certifications', v)} placeholder="AWS Cloud Practitioner — Amazon, 2025"/><div className="mt-5"><Field label="Achievements" multiline value={resume.achievements} onChange={v => update('achievements', v)} placeholder="Hackathon finalist, coding contest achievements..."/></div><div className="mt-7 border-t border-slate-100 pt-6"><div className="mb-3 flex items-center gap-2 font-bold text-slate-800"><Palette size={17}/> Accent color</div><div className="flex flex-wrap gap-3">{['#6d4aff', '#0f766e', '#2563eb', '#be185d', '#334155', '#b45309'].map(c => <button key={c} onClick={() => update('color', c)} aria-label={`Choose ${c}`} className={`h-9 w-9 rounded-full border-4 ${resume.color === c ? 'border-slate-300 ring-2 ring-violet-300' : 'border-white'}`} style={{ backgroundColor: c }}/>)}</div></div></>}
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 p-4">
            <button disabled={currentStep === 0} onClick={() => setActive(steps[currentStep - 1].id)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
            {currentStep < steps.length - 1 ? <button onClick={() => setActive(steps[currentStep + 1].id)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700">Next <ArrowRight size={15}/></button> : <button onClick={downloadPDF} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700"><Download size={15}/> Download</button>}
          </div>
        </section>
        <section className={`${showPreview ? 'block' : 'hidden lg:block'} min-w-0`}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div><div className="text-sm font-extrabold text-slate-800">Live preview</div><div className="text-xs text-slate-400">A4 page · Updates as you type</div></div>
            <div className="flex items-center gap-2"><label className="text-xs font-bold text-slate-500">Template</label><select value={template} onChange={e => setTemplate(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-semibold text-slate-700 outline-none"><option value="minimal">Minimal</option><option value="professional">Professional</option><option value="creative">Creative</option></select></div>
          </div>
          <div className="overflow-x-auto rounded-2xl bg-slate-200/70 p-3 md:p-5">
            <div ref={previewRef} className="mx-auto w-full max-w-[794px]"><Template resume={resume}/></div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">Tip: Keep descriptions concise so your resume stays easy to scan.</p>
        </section>
      </div>
    </div>
  </div>
}
