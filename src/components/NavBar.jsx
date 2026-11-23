import { FileText, ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  return (
    <header className="sticky top-0 z-30 border-b border-violet-100/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="rounded-xl bg-violet-600 p-2 text-white"><FileText size={21} /></span>
          <span className="text-xl font-black tracking-tight">Resume<span className="text-violet-600">Craft.</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/templates" className="hidden text-sm font-semibold text-slate-600 hover:text-violet-700 sm:block">Templates</Link>
          <Link to={location.pathname === '/builder' ? '/templates' : '/templates'} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">
            {location.pathname === '/builder' ? 'Change template' : 'Get started'} <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  )
}
