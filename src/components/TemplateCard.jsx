import { Check, ArrowUpRight } from 'lucide-react'

const templates = [
  { id: 'minimal', name: 'Minimal', tag: 'ATS-friendly', description: 'A clean, timeless layout that keeps the focus on your experience.' },
  { id: 'professional', name: 'Professional', tag: 'Corporate', description: 'A confident two-column design with a strong profile sidebar.' },
  { id: 'creative', name: 'Creative', tag: 'Modern', description: 'A bold layout with expressive color and a standout profile.' },
]

function MiniResume({ type }) {
  return (
    <div className={`pointer-events-none mx-auto h-[270px] w-[205px] overflow-hidden rounded-md bg-white p-4 shadow-[0_8px_30px_rgba(25,20,50,.13)] ${type === 'professional' ? 'border-l-[13px] border-slate-800' : ''}`}>
      {type === 'creative' && <div className="mb-3 h-2 w-full rounded bg-violet-500" />}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className={`text-[15px] font-black leading-tight ${type === 'professional' ? 'text-slate-800' : 'text-slate-900'}`}>Alex Morgan</div>
          <div className="mt-1 text-[7px] font-semibold text-violet-600">SOFTWARE ENGINEER</div>
        </div>
        {type !== 'minimal' && <div className="h-9 w-9 shrink-0 rounded-full bg-violet-100" />}
      </div>
      <div className="my-3 h-px bg-slate-200" />
      {['PROFILE', 'EXPERIENCE', 'EDUCATION', 'SKILLS'].map((item, index) => (
        <div key={item} className="mb-3">
          <div className="mb-1 text-[7px] font-extrabold tracking-widest text-violet-600">{item}</div>
          <div className="mb-1 h-1 w-full rounded bg-slate-200" />
          <div className="mb-1 h-1 w-[88%] rounded bg-slate-100" />
          {index === 1 && <div className="mt-1 h-1 w-[68%] rounded bg-slate-100" />}
        </div>
      ))}
    </div>
  )
}

export default function TemplateCard({ template, selected, onSelect }) {
  return (
    <button onClick={onSelect} className={`group relative rounded-3xl border-2 p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl ${selected ? 'border-violet-600 bg-violet-50/60 shadow-xl shadow-violet-100' : 'border-white bg-white shadow-md shadow-slate-200/60 hover:border-violet-200'}`}>
      {selected && <span className="absolute right-4 top-4 z-10 rounded-full bg-violet-600 p-1.5 text-white"><Check size={15} /></span>}
      <div className="mb-5 flex min-h-[300px] items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-violet-100/70 p-5">
        <MiniResume type={template.id} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-600">{template.tag}</span>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">{template.name}</h3>
        </div>
        <ArrowUpRight className="text-slate-400 transition group-hover:text-violet-600" />
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-500">{template.description}</p>
    </button>
  )
}

export { templates }
