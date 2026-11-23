import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import NavBar from '../components/NavBar'
import TemplateCard, { templates } from '../components/TemplateCard'
import { useResume } from '../context/ResumeContext'

export default function TemplateSelection() {
  const { template, setTemplate } = useResume()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8f7fc]">
      <NavBar />
      <main className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-violet-700"><ArrowLeft size={16} /> Back home</Link>
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-black tracking-wider text-violet-700">STEP 1 OF 2</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Choose your resume style.</h1>
          <p className="mt-4 text-slate-500">Select a template to get started. You can switch templates later without losing your information.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {templates.map(item => <TemplateCard key={item.id} template={item} selected={template === item.id} onSelect={() => setTemplate(item.id)} />)}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-violet-100 bg-white p-5 shadow-sm sm:flex-row sm:px-7">
          <div className="flex items-center gap-3"><span className="rounded-xl bg-emerald-50 p-2 text-emerald-600"><CheckCircle2 size={20} /></span><div><div className="font-bold text-slate-900">Template selected: {templates.find(t => t.id === template)?.name}</div><div className="text-sm text-slate-500">Your choice is saved automatically.</div></div></div>
          <button onClick={() => navigate('/builder')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 sm:w-auto">Build my resume <ArrowRight size={17} /></button>
        </div>
      </main>
    </div>
  )
}
