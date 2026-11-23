export default function Creative({ resume }) {
  const p = resume.personal
  return <div className="preview-page !p-0">
    <header className="bg-violet-700 px-8 py-9 text-white">
      <div className="flex items-center gap-5">
        {p.photo ? <img src={p.photo} alt="Profile" className="h-24 w-24 rounded-2xl border-2 border-white/50 object-cover"/> : <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black">{(p.firstName?.[0] || 'Y') + (p.lastName?.[0] || 'N')}</div>}
        <div><h1 className="!text-3xl">{`${p.firstName} ${p.lastName}`.trim() || 'Your Name'}</h1><div className="mt-2 text-sm font-semibold tracking-wide text-violet-100">{p.role || 'Your Professional Title'}</div></div>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-violet-100">{[p.email, p.phone, p.location, p.website].filter(Boolean).map(x => <span key={x}>{x}</span>)}</div>
    </header>
    <main className="px-8 py-7">
      <section><h2 className="!text-violet-700">About me</h2><p>{resume.summary || 'Add a short introduction about yourself.'}</p></section>
      <div className="grid grid-cols-2 gap-6">
        <section><h2 className="!text-violet-700">Experience</h2>{resume.experience.filter(x => x.company || x.position).map((x, i) => <div key={i} className="mb-4"><div className="entry-title">{x.position}</div><div className="entry-subtitle">{x.company}</div><div className="muted">{x.start} {x.end && `— ${x.end}`}</div><p>{x.description}</p></div>)}</section>
        <section><h2 className="!text-violet-700">Education</h2>{resume.education.filter(x => x.school || x.degree).map((x, i) => <div key={i} className="mb-4"><div className="entry-title">{x.degree}</div><div className="entry-subtitle">{x.school}</div><div className="muted">{x.start} {x.end && `— ${x.end}`}</div>{x.grade && <p>{x.grade}</p>}</div>)}</section>
      </div>
      <section><h2 className="!text-violet-700">Skills</h2><div className="flex flex-wrap gap-2">{(resume.skills || '').split(',').map(x => x.trim()).filter(Boolean).map(x => <span key={x} className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-semibold text-violet-700">{x}</span>)}</div></section>
      <section><h2 className="!text-violet-700">Selected projects</h2>{resume.projects.filter(x => x.name || x.description).map((x, i) => <div key={i} className="mb-3"><div className="entry-title">{x.name}</div><div className="entry-subtitle">{x.technologies}</div><p>{x.description}</p></div>)}</section>
      {resume.certifications && <section><h2 className="!text-violet-700">Certifications</h2><p>{resume.certifications}</p></section>}
      {resume.achievements && <section><h2 className="!text-violet-700">Achievements</h2><p>{resume.achievements}</p></section>}
    </main>
  </div>
}
