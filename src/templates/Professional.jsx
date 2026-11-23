import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react'

export default function Professional({ resume }) {
  const p = resume.personal
  return <div className="preview-page !p-0">
    <div className="grid min-h-[1050px] grid-cols-[34%_66%]">
      <aside className="bg-slate-900 px-5 py-9 text-white">
        {p.photo ? <img src={p.photo} alt="Profile" className="mx-auto mb-5 h-24 w-24 rounded-full border-4 border-white/20 object-cover"/> : <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-violet-500 text-2xl font-black">{(p.firstName?.[0] || 'Y') + (p.lastName?.[0] || 'N')}</div>}
        <h1 className="text-center !text-xl">{`${p.firstName} ${p.lastName}`.trim() || 'Your Name'}</h1>
        <p className="mt-2 text-center !text-[10px] !text-violet-200">{p.role || 'Professional Title'}</p>
        <h2 className="mt-8 !border-b !border-white/20 !pb-2 !text-violet-200">Contact</h2>
        {[p.email, p.phone, p.location, p.website].filter(Boolean).map((v, i) => <p key={i} className="mb-2 !break-words !text-[9px] !text-slate-200">{v}</p>)}
        <h2 className="mt-7 !border-b !border-white/20 !pb-2 !text-violet-200">Skills</h2>
        {(resume.skills || '').split(',').map(s => s.trim()).filter(Boolean).map(s => <p key={s} className="mb-2 !text-[10px] !text-slate-100">• {s}</p>)}
        {resume.certifications && <><h2 className="mt-7 !border-b !border-white/20 !pb-2 !text-violet-200">Certifications</h2><p className="!text-[9px] !text-slate-200">{resume.certifications}</p></>}
      </aside>
      <main className="px-6 py-9">
        <section><h2 className="!mt-0 !text-violet-700">Profile</h2><p>{resume.summary || 'Add your professional summary here.'}</p></section>
        <section><h2 className="!text-violet-700">Work experience</h2>{resume.experience.filter(x => x.company || x.position).map((x, i) => <div key={i} className="mb-4"><div className="entry-title">{x.position}</div><div className="entry-subtitle">{x.company} · {x.start} {x.end && `— ${x.end}`}</div><p>{x.description}</p></div>)}</section>
        <section><h2 className="!text-violet-700">Education</h2>{resume.education.filter(x => x.school || x.degree).map((x, i) => <div key={i} className="mb-4"><div className="entry-title">{x.degree}</div><div className="entry-subtitle">{x.school} · {x.start} {x.end && `— ${x.end}`}</div>{x.grade && <p>{x.grade}</p>}</div>)}</section>
        <section><h2 className="!text-violet-700">Projects</h2>{resume.projects.filter(x => x.name || x.description).map((x, i) => <div key={i} className="mb-4"><div className="entry-title">{x.name}</div><div className="entry-subtitle">{x.technologies}</div><p>{x.description}</p></div>)}</section>
        {resume.achievements && <section><h2 className="!text-violet-700">Achievements</h2><p>{resume.achievements}</p></section>}
      </main>
    </div>
  </div>
}
