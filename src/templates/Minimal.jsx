import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react'

export default function Minimal({ resume }) {
  const p = resume.personal
  return <div className="preview-page">
    <header className="border-b-2 border-slate-800 pb-5">
      <h1>{`${p.firstName} ${p.lastName}`.trim() || 'Your Name'}</h1>
      <div className="mt-2 text-sm font-semibold uppercase tracking-widest text-violet-700">{p.role || 'Your Professional Title'}</div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
        {p.email && <span className="flex items-center gap-1"><Mail size={10}/>{p.email}</span>}
        {p.phone && <span className="flex items-center gap-1"><Phone size={10}/>{p.phone}</span>}
        {p.location && <span className="flex items-center gap-1"><MapPin size={10}/>{p.location}</span>}
        {p.website && <span className="flex items-center gap-1"><LinkIcon size={10}/>{p.website}</span>}
      </div>
    </header>
    <section><h2 className="section-line">Professional summary</h2><p>{resume.summary || 'Write a short professional summary to introduce yourself.'}</p></section>
    <section><h2 className="section-line">Experience</h2>{resume.experience.filter(x => x.company || x.position).map((x, i) => <div className="mb-3" key={i}><div className="entry-title">{x.position || 'Position'}{x.company ? ` · ${x.company}` : ''}</div><div className="entry-subtitle">{x.start} {x.end && `— ${x.end}`}</div><p>{x.description}</p></div>)}</section>
    <section><h2 className="section-line">Education</h2>{resume.education.filter(x => x.school || x.degree).map((x, i) => <div className="mb-3" key={i}><div className="entry-title">{x.degree || 'Degree'}</div><div className="entry-subtitle">{x.school} {x.start && `· ${x.start}`} {x.end && `— ${x.end}`}</div>{x.grade && <p>{x.grade}</p>}</div>)}</section>
    <section><h2 className="section-line">Skills</h2><p>{resume.skills || 'Add your skills'}</p></section>
    <section><h2 className="section-line">Projects</h2>{resume.projects.filter(x => x.name || x.description).map((x, i) => <div className="mb-3" key={i}><div className="entry-title">{x.name}</div><div className="entry-subtitle">{x.technologies}</div><p>{x.description} {x.link}</p></div>)}</section>
    {resume.certifications && <section><h2 className="section-line">Certifications</h2><p>{resume.certifications}</p></section>}
    {resume.achievements && <section><h2 className="section-line">Achievements</h2><p>{resume.achievements}</p></section>}
  </div>
}
