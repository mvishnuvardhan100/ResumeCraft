import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, Palette, Download, Sparkles, FileText } from 'lucide-react'
import NavBar from '../components/NavBar'

const features = [
  { icon: Eye, title: 'Live preview', description: 'Watch your resume update instantly as you enter your details.' },
  { icon: Palette, title: 'Three polished templates', description: 'Choose a style that matches your goals and personality.' },
  { icon: Sparkles, title: 'Easy customization', description: 'Add sections, update your details and choose an accent color.' },
  { icon: Download, title: 'PDF export', description: 'Download a clean, shareable PDF when your resume is ready.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f7fc]">
      <NavBar />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-bold text-violet-700 shadow-sm">
              <Sparkles size={15} /> YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-[1.06] tracking-tight text-slate-950 md:text-7xl">
              Make your first impression <span className="text-violet-600">count.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-500">
              Build a resume that tells your story. Pick a beautiful template, add your experience and see every change in real time.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/templates" className="inline-flex items-center gap-3 rounded-2xl bg-violet-600 px-7 py-4 font-bold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700">
                Build my resume <ArrowRight size={18} />
              </Link>
              <a href="#features" className="rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:border-violet-200">Explore features</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              {['Free to use', 'No account required', 'PDF download'].map(item => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" />{item}</span>)}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-8 rounded-[4rem] bg-violet-200/60 blur-3xl" />
            <div className="relative rotate-1 rounded-[2rem] border border-white bg-white p-7 shadow-2xl shadow-violet-200/70 md:p-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div><div className="text-3xl font-black text-slate-900">Alex Morgan</div><div className="mt-2 text-sm font-semibold text-violet-600">PRODUCT DESIGNER</div><div className="mt-2 text-xs text-slate-400">alex@email.com · +91 98765 43210</div></div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-xl font-black text-violet-600">AM</div>
              </div>
              <div className="space-y-6 pt-6">
                {['PROFILE', 'EXPERIENCE', 'EDUCATION'].map((title, i) => <div key={title}><h3 className="mb-2 text-xs font-black tracking-[.18em] text-violet-600">{title}</h3><div className="h-2 w-full rounded bg-slate-100" /><div className="mt-2 h-2 w-[88%] rounded bg-slate-100" />{i === 1 && <div className="mt-2 h-2 w-[65%] rounded bg-slate-100" />}</div>)}
                <div><h3 className="mb-3 text-xs font-black tracking-[.18em] text-violet-600">SKILLS</h3><div className="flex flex-wrap gap-2">{['React', 'Figma', 'JavaScript', 'UI Design'].map(x => <span key={x} className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">{x}</span>)}</div></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
              <span className="rounded-xl bg-emerald-100 p-2 text-emerald-600"><CheckCircle2 size={20} /></span>
              <div><div className="text-sm font-extrabold">Looking sharp!</div><div className="text-xs text-slate-400">Your resume is ready to shine.</div></div>
            </div>
          </div>
        </section>
        <section id="features" className="border-y border-slate-100 bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-xl text-center"><p className="text-xs font-black tracking-[.2em] text-violet-600">MADE TO MAKE IT SIMPLE</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Everything you need to stand out.</h2><p className="mt-4 text-slate-500">A focused set of tools to help you create a polished resume.</p></div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{features.map(({ icon: Icon, title, description }) => <article key={title} className="rounded-3xl border border-slate-100 p-7 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"><span className="inline-flex rounded-2xl bg-violet-50 p-3 text-violet-600"><Icon size={22} /></span><h3 className="mt-5 font-extrabold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></article>)}</div>
          </div>
        </section>
        <section className="px-5 py-20 text-center"><FileText className="mx-auto text-violet-600" size={32} /><h2 className="mt-4 text-3xl font-black text-slate-950">Your next opportunity is waiting.</h2><p className="mt-3 text-slate-500">Start building your resume in just a few steps.</p><Link to="/templates" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-4 font-bold text-white transition hover:bg-violet-700">Choose a template <ArrowRight size={17} /></Link></section>
      </main>
      <footer className="border-t border-slate-100 bg-white px-5 py-7 text-center text-sm text-slate-400">© 2026 ResumeCraft. Built for your next opportunity.</footer>
    </div>
  )
}
